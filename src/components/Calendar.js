import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebaseConfig";
import {doc, getDoc, setDoc, collection, addDoc, deleteDoc, getDocs, writeBatch} from "firebase/firestore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function getMonthDays(base) {
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const firstDayIndex = first.getDay(); 
  const lastDayIndex = last.getDay();
  const lastDayDate = last.getDate();

  const days = [];

  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(year, month, -i + 1);
    days.push({ value: prevDate.getDate(), isCurrent: false });
  }

  for (let i = 1; i <= lastDayDate; i++) {
    days.push({ value: i, isCurrent: true });
  }

  for (let i = 1; i <= 6 - lastDayIndex; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({ value: nextDate.getDate(), isCurrent: false });
  }

  const header = base.toLocaleString("default", { month: "long", year: "numeric" });
  return { days, header };
}

const Calendar = () => {
  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false)
 const [showDeleteModal, setShowDeleteModal] = useState(false)
const [habitIdToDelete, setHabitIdToDelete] = useState("")
  const [newHabitName, setNewHabitName] = useState("")

  const [habits, setHabits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { days: calendarDays, header } = useMemo(
    () => getMonthDays(currentDate),
    [currentDate]
  )

  const [selectedByHabit, setSelectedByHabit] = useState({});

  const fetchHabits = async () => {
    if (!currentUser) return
    const habitsRef = collection(db, "users", currentUser.uid, "habits")
    const snap = await getDocs(habitsRef)
    const list = snap.docs.map((d) => ({ id: d.id, name: d.data().name }))
    setHabits(list)
  }

  const addHabit = async (name) => {
    if (!currentUser || !name) return;
    const habitsRef = collection(db, "users", currentUser.uid, "habits");
    const docRef = await addDoc(habitsRef, { name });
    setHabits((prev) => [...prev, { id: docRef.id, name }]);
    setSelectedByHabit((prev) => ({ ...prev, [docRef.id]: [] }));
  };

  const deleteHabit = async (habitId) => {
    if (!currentUser || !habitId) return;
    try {
      const calRef = collection(
        db,
        "users",
        currentUser.uid,
        "habits",
        habitId,
        "calendar"
      );
      const calSnap = await getDocs(calRef);

      const batch = writeBatch(db);
      calSnap.forEach((d) => batch.delete(d.ref)); 

      batch.delete(doc(db, "users", currentUser.uid, "habits", habitId));

      await batch.commit();

      setHabits((prev) => prev.filter((h) => h.id !== habitId));
      setSelectedByHabit((prev) => {
        const { [habitId]: _removed, ...rest } = prev;
        return rest;
      });

      setHabitIdToDelete("");
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  };

  const saveSelectedDays = async (habitId, selectedDays) => {
    if (!currentUser) return;
    await setDoc(
      doc(db, "users", currentUser.uid, "habits", habitId, "calendar", header),
      { selectedDays },
      { merge: true }
    );
  };

  const loadSelectedDays = async (habitId) => {
    if (!currentUser) return [];
    const snap = await getDoc(
      doc(db, "users", currentUser.uid, "habits", habitId, "calendar", header)
    );
    return snap.exists() ? snap.data().selectedDays || [] : [];
  };

  const moveMonth = (direction) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + direction);
    setCurrentDate(d);
  };

  const toggleDay = (habitId, dayIndex) => {
    const day = calendarDays[dayIndex];
    if (!day.isCurrent) return;

    setSelectedByHabit((prev) => {
      const current = new Set(prev[habitId] || []);
      if (current.has(day.value)) current.delete(day.value);
      else current.add(day.value);
      const updated = Array.from(current).sort((a, b) => a - b);
      const next = { ...prev, [habitId]: updated };
      saveSelectedDays(habitId, updated);
      return next;
    });
  };

  useEffect(() => {
    fetchHabits();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || habits.length === 0 || !header) return;
    (async () => {
      const entries = await Promise.all(
        habits.map(async (h) => [h.id, await loadSelectedDays(h.id)])
      );
      setSelectedByHabit(Object.fromEntries(entries));
    })();
  }, [header, habits, currentUser]);

  return (
    <>
      <div className="flex justify-center w-full my-2 px-8">
        <div className="calendar w-full">
          <div className="border dark:border-stone-600 flex justify-between items-center font-dmserif text-stone-800 text-xl p-2 m-2">
            <button
              onClick={() => moveMonth(-1)}
              className="border dark:text-stone-100 dark:border-stone-600 rounded-full p-1"
            >
              <ChevronLeft />
            </button>
            <div className="pt-1 dark:text-stone-100">{header}</div>
            <button
              onClick={() => moveMonth(1)}
              className="border dark:text-stone-100 dark:border-stone-600 rounded-full p-1"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-y-2 gap-x-3 px-2 pb-2">
            {habits.length === 0 && (
              <div className="col-span-2 text-center text-sm text-stone-400 py-6
              font-geist font-extralight">
                No habits yet. Click “+ New habit” to add your first one.
              </div>
            )}

            {habits.map((habit) => {
              const selected = new Set(selectedByHabit[habit.id] || []);
              return (
                <div key={habit.id} className="contents">
                  <div className="h-full rounded-md bg-stone-200 dark:bg-stone-700 border dark:border-stone-600 px-3 py-2 flex items-center">
                    <p className="font-dmserif text-stone-800 dark:text-stone-100 whitespace-normal break-words hyphens-auto leading-snug">
                      {habit.name}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 py-2 w-full px-2 overflow-x-auto md:overflow-x-visible">
                    {calendarDays.map((day, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleDay(habit.id, idx)}
                        className={`
                          py-3 rounded-md font-geist font-extralight text-center transition-all ease-linear duration-200
                          ${day.isCurrent ? "text-black dark:text-stone-100" : "text-gray-400"}
                          ${
                            selected.has(day.value) && day.isCurrent
                              ? "bg-green-400 dark:bg-green-700"
                              : "bg-stone-200 dark:bg-stone-500"
                          }
                          min-w-[48px] md:min-w-0 md:flex-1
                        `}
                      >
                        {day.value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-stone-800 text-white dark:text-stone-800 dark:bg-white border-2 
          dark:border-stone-600 ml-8 px-2 py-1 my-2 shadow-lg font-geist font-extralight">
          + New habit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-stone-100 dark:text-white border-2 dark:border-stone-600 mx-4 px-2 
          py-1 my-2 shadow-lg font-geist font-extralight">
          - Delete habit
        </button>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300
        ${showModal ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`transform transition-transform duration-300 ${
            showModal ? "scale-100" : "scale-95"
          } bg-white dark:bg-stone-800 p-6 rounded shadow`}
        >
          <h2 className="mb-2 font-dmserif text-stone-800 dark:text-white font-extralight">
            Name your new habit
          </h2>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="border p-2 rounded w-full mb-4 font-geist font-extralight"
            placeholder="Habit name"
          />
          <div className="flex gap-2">
            <button
              className="bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-800 px-4 py-2 rounded font-dmserif"
              onClick={() => {
                const name = newHabitName.trim();
                if (name) addHabit(name);
                setNewHabitName("");
                setShowModal(false);
              }}
            >
              Add
            </button>
            <button
              className="bg-gray-300 dark:bg-stone-600 dark:text-white px-4 py-2 rounded font-geist font-extralight"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300
        ${showDeleteModal ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`transform transition-transform duration-300 ${
            showDeleteModal ? "scale-100" : "scale-95"
          } bg-white dark:bg-stone-800 p-6 rounded shadow w-[min(90vw,28rem)]`}
        >
          <h2 className="mb-3 font-dmserif text-stone-800 dark:text-white">
            Delete a habit
          </h2>
          <label className="block mb-2 text-sm dark:text-stone-200 font-geist">
            Choose a habit to delete:
          </label>
          <select
            value={habitIdToDelete}
            onChange={(e) => setHabitIdToDelete(e.target.value)}
            className="w-full border rounded p-2 mb-4 bg-white dark:bg-stone-700 dark:text-white dark:border-stone-600 font-geist font-extralight"
          >
            <option value="" disabled>
              -- Select habit --
            </option>
            {habits.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>

          <p className="text-xs text-stone-500 dark:text-stone-300 mb-4">
            This will remove the habit and its monthly calendar data. This action cannot be undone.
          </p>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 dark:bg-stone-600 dark:text-white px-4 py-2 rounded font-geist font-extralight"
              onClick={() => {
                setHabitIdToDelete("");
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              disabled={!habitIdToDelete}
              className={`px-4 py-2 rounded font-dmserif ${
                habitIdToDelete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-300 text-white cursor-not-allowed"
              }`}
              onClick={() => deleteHabit(habitIdToDelete)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
