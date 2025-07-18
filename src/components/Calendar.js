import { ChevronLeft, ChevronRight } from "lucide-react"

const Calendar = () => {

    let currentDate = new Date()

    const currentMonth = currentDate.getMonth()

    const currentDay = currentDate.getDate()

    const currentDayIndex = currentDate.getDay()

    const updateCalendar = () => {
        const currentYear = date.getFullYear()
        const currentMonth = date.getMonth()

        const firstDay = new Date(currentYear, currentMonth, 1)
        const lastDay = new Date(currentYear, currentMonth + 1, 0)

        const firstDayIndex = firstDay.getDay()
        const lastDayIndex = lastDay.getDay()

        for (let i = firstDayIndex; i >= 0; i--){
            
        }
    }


    const monthYearString = currentDate.toLocaleString
    ('default', {month: 'long', year: 'numeric'})

  return (
    <div className="flex justify-center max-w-screen">
        <div className='calendar'>
            <div className='border flex justify-between font-dmserif text-stone-800 text-xl p-2 m-2'>
                <button className="border rounded-full p-1"><ChevronLeft /></button> 
                <div className="pt-1">{monthYearString}</div> 
                <button className="border rounded-full p-1"><ChevronRight/></button>
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
            <div>
                current Date:{currentDay} 
                current Day: {currentDayIndex}
            </div>
        </div>
    </div>
  )
}

export default Calendar