import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";

const Cal = () => {
    const { currentUser } = useAuth();

    const [habits, setHabits] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [selectedHabit, setSelectedHabit] = useState(null);

    // ...existing calendar state...
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState([]);
    const [header, setHeader] = useState("");

    // --- Habit CRUD ---
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

    useEffect(() => {
        fetchHabits();
    }, [currentUser]);

    // --- Calendar logic (update to use selectedHabit) ---
    const saveSelectedDays = async (selectedDays) => {
        if (!currentUser || !selectedHabit) return;
        const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        await setDoc(
            doc(db, "users", currentUser.uid, "habits", selectedHabit, "calendar", monthYear),
            { selectedDays }
        );
    };

    const loadSelectedDays = async () => {
        if (!currentUser || !selectedHabit) return [];
        const monthYear = header;
        const docSnap = await getDoc(doc(db, "users", currentUser.uid, "habits", selectedHabit, "calendar", monthYear));
        return docSnap.exists() ? docSnap.data().selectedDays : [];
    };

    // ...rest of your calendar logic (updateCalendar, moveMonth, toggleDay, etc.)...

    // --- UI ---
    return (
        <div className="flex flex-col items-center max-w-screen">
            {/* Habit Selector */}
            <div className="flex gap-2 mb-4">
                {habits.map(habit => (
                    <button
                        key={habit.id}
                        className={`px-4 py-2 rounded ${selectedHabit === habit.id ? "bg-green-400 text-white" : "bg-stone-200"}`}
                        onClick={() => setSelectedHabit(habit.id)}
                    >
                        {habit.name}
                    </button>
                ))}
                <button
                    className="px-4 py-2 rounded bg-blue-500 text-white"
                    onClick={() => setShowModal(true)}
                >
                    Add New Habit
                </button>
            </div>
            {/* Modal for naming new habit */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-stone-800 p-6 rounded shadow">
                        <h2 className="mb-2 font-geist text-white">Name your new habit</h2>
                        <input
                            type="text"
                            value={newHabitName}
                            onChange={e => setNewHabitName(e.target.value)}
                            className="border p-2 rounded w-full mb-4"
                            placeholder="Habit name"
                        />
                        <div className="flex gap-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    addHabit(newHabitName);
                                    setNewHabitName("");
                                    setShowModal(false);
                                }}
                            >
                                Add
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Calendar for selected habit */}
        </div>
    );
};

export default Cal