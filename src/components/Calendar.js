import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, collection, addDoc, getDocs  } from "firebase/firestore";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react";

const Calendar = () => {

    const { currentUser } = useAuth()

    const [showModal, setShowModal] = useState(false)
    const [newHabitName, setNewHabitName] = useState("")
    const [habits, setHabits] = useState([])
    const [selectedHabit, setSelectedHabit] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [calendarDays, setCalendarDays] = useState([])
    const [header, setHeader] = useState("")

    const fetchHabits = async () => {
        if (!currentUser) return;
        const habitsRef = collection(db, "users", currentUser.uid, "habits");
        const snapshot = await getDocs(habitsRef);
        const habitList = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        setHabits(habitList);
        if (habitList.length > 0 && !selectedHabit) setSelectedHabit(habitList[0].id);
    };

    const addHabit = async (name) => {
        if (!currentUser || !name) return;
        const habitsRef = collection(db, "users", currentUser.uid, "habits");
        const docRef = await addDoc(habitsRef, { name });
        setHabits(prev => [...prev, { id: docRef.id, name }]);
        setSelectedHabit(docRef.id);
    };

    const saveSelectedDays = async (selectedDays) => {
        if (!currentUser) return;
        const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        await setDoc(
            doc(db, "users", currentUser.uid, "calendar", monthYear),
            { selectedDays}
        )
    }

    const loadSelectedDays = async () => {
        if (!currentUser) return [];
        const monthYear = header;
        const docSnap = await getDoc(doc(db, "users", currentUser.uid, "calendar", monthYear))
        return docSnap.exists() ? docSnap.data().selectedDays : []
    }

    const updateCalendar = () => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        const lastDayDate = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();

        const dates = [];

        const monthYearString = currentDate.toLocaleString
        ('default', {month: 'long', year: 'numeric'})
        setHeader(monthYearString)

        for (let i = firstDayIndex; i > 0; i--) {
            const prevDate = new Date(currentYear, currentMonth, -i + 1);
            dates.push(
            { value: prevDate.getDate(), isCurrent: false }
            );
        }

        for (let i = 1; i <= lastDayDate; i++) {
            dates.push(
            { value: i, isCurrent: true }
            );
        }

        for (let i = 1; i <= 6 - lastDayIndex; i++) {
            const nextDate = new Date(currentYear, currentMonth + 1, i);
            dates.push(
            { value: nextDate.getDate(), isCurrent: false }
            );
        }

        setCalendarDays(dates);
        };    

    const moveMonth = (direction) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + direction)
        setCurrentDate(newDate)
    }

    const toggleDay = (index) => {
        setCalendarDays((prevDays) => {
            const newDays = prevDays.map((day, i) =>
            i === index ? { ...day, selected: !day.selected } : day
            );
            const selected = newDays.filter(d => d.selected && d.isCurrent).map(d => d.value);
            saveSelectedDays(selected);
            return newDays;
        });
        };

    useEffect(() => {
        updateCalendar();
    }, [currentDate]);

    useEffect(() => {
        if (!header) return;
        loadSelectedDays().then((selected) => {
            setCalendarDays((days) =>
                days.map((day) => ({
                    ...day,
                    selected: selected.includes(day.value) && day.isCurrent,
                }))
            );
        });
    }, [header, currentUser]);

  return (
    <>
    <div className="flex justify-center w-full my-2 px-8">
      <div className='calendar'>
        <div className='border dark:border-stone-600 flex justify-between font-dmserif text-stone-800 
        text-xl p-2 m-2'>
          <button onClick={() => moveMonth(-1)} className="border dark:text-stone-100 dark:border-stone-600 
          rounded-full p-1"><ChevronLeft /></button> 
          <div className="pt-1 dark:text-stone-100">{header}</div> 
          <button onClick={() => moveMonth(1)} className="border dark:text-stone-100 dark:border-stone-600 
          rounded-full p-1"><ChevronRight/></button>
        </div>
        <div
          className="
            flex flex-row gap-2 py-2 w-full px-2
            overflow-x-auto
            md:overflow-x-visible
          "
        >
          {calendarDays.map((day, idx) => (
            <button
              key={idx}
              className={`
                py-3 rounded-md font-geist font-extralight text-center transition-all ease-linear duration-200
                ${day.isCurrent ? "text-black dark:text-stone-100" : "text-gray-400"}
                ${day.selected ? "bg-green-400 dark:bg-green-700" : "bg-stone-100 dark:bg-stone-500"}
                min-w-[48px] md:min-w-0 md:flex-1
              `}
              onClick={() => toggleDay(idx)}
            >
              {day.value}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div>
      <button  onClick={() => setShowModal(true)} className="dark:text-white border-2 dark:border-stone-600 mx-8 px-2 
      py-1 my-2 shadow-lg font-geist font-extralight">+ New habit</button>
    </div>
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300
    ${showModal ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none"}`}>
      <div className={`transform transition-transform duration-300 ${showModal ? "scale-100" : "scale-95"}
      bg-white dark:bg-stone-800 p-6 rounded shadow`}>
        <h2 className="mb-2 font-dmserif text-stone-800 dark:text-white font-extralight">Name your new habit</h2>
          <input
              type="text"
              value={newHabitName}
              onChange={e => setNewHabitName(e.target.value)}
              className="border p-2 rounded w-full mb-4 font-geist font-extralight"
              placeholder="Habit name"
          />
          <div className="flex gap-2">
              <button
                  className="bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-800 px-4 py-2 rounded font-dmserif"
                  onClick={() => {
                      addHabit(newHabitName);
                      setNewHabitName("");
                      setShowModal(false);
                  }}>Add</button>
              <button
                  className="bg-gray-300 dark:bg-stone-600 dark:text-white px-4 py-2 rounded font-geist font-extralight"
                  onClick={() => setShowModal(false)}>
                  Cancel
              </button>
          </div>
      </div>
  </div>
    </>
  )
}

export default Calendar