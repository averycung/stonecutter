import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react";

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [calendarDays, setCalendarDays] = useState([])
    const [header, setHeader] = useState("")

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
        setCalendarDays((prevDays) =>
            prevDays.map((day, i) =>
            i === index ? { ...day, selected: !day.selected } : day
            )
        );
        }

    useEffect(() => {
            updateCalendar();
        }, [currentDate]);    

  return (
    <div className="flex justify-center max-w-screen">
        <div className='calendar'>
            <div className='border dark:border-stone-600 flex justify-between font-dmserif text-stone-800 
            text-xl p-2 m-2'>
                <button onClick={() => moveMonth(-1)} className="border dark:text-stone-100 dark:border-stone-600 
                rounded-full p-1"><ChevronLeft /></button> 
                <div className="pt-1 dark:text-stone-100">{header}</div> 
                <button onClick={() => moveMonth(1)} className="border dark:text-stone-100 dark:border-stone-600 
                rounded-full p-1"><ChevronRight/></button>
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
                {calendarDays.map((day, idx) => (
            <button key={idx} className={`py-3 rounded-md m-2 font-geist font-extralight text-center transition-all ease-linear duration-200
                ${day.isCurrent ? "text-black dark:text-stone-100" : "text-gray-400"} 
                ${day.selected ? "bg-stone-400 dark:bg-stone-700" : "bg-stone-100 dark:bg-stone-500"} `}
                onClick={() => toggleDay(idx)}
            >
              {day.value}
            </button>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Calendar