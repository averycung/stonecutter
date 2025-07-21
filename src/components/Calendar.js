import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";

const Calendar = () => {

    let currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const updateCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        const lastDayDate = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();

        const dates = [];

        for (let i = firstDayIndex; i > 0; i--) {
            const prevDate = new Date(currentYear, currentMonth, -i + 1);
            dates.push(
            <button key={`prev-${i}`} className="text-gray-400 py-1">
                {prevDate.getDate()}
            </button>
            );
        }

        for (let i = 1; i <= lastDayDate; i++) {
            dates.push(
            <button key={`curr-${i}`} className="text-black py-1">
                {i}
            </button>
            );
        }

        for (let i = 1; i <= 6 - lastDayIndex; i++) {
            const nextDate = new Date(currentYear, currentMonth + 1, i);
            dates.push(
            <button key={`next-${i}`} className="text-gray-400 py-1">
                {nextDate.getDate()}
            </button>
            );
        }

        return dates;
        };

    const [calendar, setCalendar] = useState(updateCalendar())

    const moveForward = () => {
        currentDate = new Date(currentYear, currentMonth + 1)
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        setCalendar(updateCalendar())
    }

    const moveBackward = () => {
        currentDate = new Date(currentYear, currentMonth - 1)
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        setCalendar(updateCalendar())
    }

    const monthYearString = currentDate.toLocaleString
    ('default', {month: 'long', year: 'numeric'})

  return (
    <div className="flex justify-center max-w-screen">
        <div className='calendar'>
            <div className='border flex justify-between font-dmserif text-stone-800 text-xl p-2 m-2'>
                <button onclick={moveBackward} className="border rounded-full p-1"><ChevronLeft /></button> 
                <div className="pt-1">{monthYearString}</div> 
                <button onclick={moveForward} className="border rounded-full p-1"><ChevronRight/></button>
            </div>
            <div className='grid grid-cols-7'>
                <div className='day'>Sun</div>
                <div className='day'>Mon</div>
                <div className='day'>Tue</div>
                <div className='day'>Wed</div>
                <div className='day'>Thu</div>
                <div className='day'>Fri</div>
                <div className='day'>Sat</div>
            </div>
            <div className="grid grid-cols-7">
                {calendar}
            </div>
        </div>
    </div>
  )
}

export default Calendar