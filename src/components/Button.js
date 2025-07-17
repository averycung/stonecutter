import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const Button = () => {

    const navigate = useNavigate()

    const handlenav = () =>{
        navigate('/')
    }
    const [goonCount, setGoonCount] = useState(0)

    const addGoonClick = () => {
        setGoonCount(goonCount + 1)
    }

    const subtractGoonClick = () => {
        setGoonCount(goonCount - 1)
    }

    const resetGoon = () => {
        setGoonCount(0)
    }

    const [showerCount, setShowerCount] = useState(0)

    const addShowerClick = () => {
        setShowerCount(showerCount + 1)
    }

    const subtractShowerClick = () => {
        setShowerCount(showerCount - 1)
    }

    const resetShower = () => {
        setShowerCount(0)
    }
    
  return (
    <>
    <Header />
    <div className='my-28'>
        <div className='flex items-center justify-center'>
            <div className='card'>
                <h1 className='flex h1 items-center justify-center'>Goon</h1>
                <Goon count={goonCount} aClick={addGoonClick} sClick={subtractGoonClick} reset={resetGoon}/>
            </div>

            <div className='card'>
                <h1 className='h1 flex items-center justify-center'>Shower</h1>
                <Shower count={showerCount} aClick={addShowerClick} sClick={subtractShowerClick} reset={resetShower}/>
            </div>
        </div>
        <div className='my-5 flex items-center justify-center'>
            <div className='bg-stone-300 dark:bg-stone-100 transition-all ease-linear duration-700 w-[500px] h-[150px] rounded-lg shadow-md py-4 px-[12px]'>
                <div className='my-1 flex items-center justify-center'>
                    <h1 className='my-0 h1'>Ratio</h1>
                </div>
                <div className='my-1 flex items-center justify-center'>
                    <h2 className='my-0 h2'>You've gooned {showerCount === 0 ? goonCount: (goonCount / showerCount).toFixed(1)} times for each shower!</h2>
                </div>
            </div>
        </div>
        <button className='absolute top-2 right-14 bg-stone-800 text-white p-2 px-4 m-2 rounded-md
        dark:bg-stone-100 dark:text-stone-800 font-bold'
        onClick={handlenav}>Login</button>
    </div>
    </>
  )
}


function Goon({count, aClick, sClick, reset}) {
    return (
    <div className='max-w-md'>
        <div className='flex items-center justify-center my-0 p-2 '>
            <button className='clickmebutton'onClick={aClick}>+</button>
            <button className='clickmebutton'onClick={sClick}>-</button>
            <button className='clickmebutton'onClick={reset}>Reset</button>
        </div>
        <div className='flex items-center justify-center my-0 p-2 '>
            <h1 className='text-2xl font-bold text-stone-800 my-0'>{count}</h1>
        </div>
    </div>
  )

}

function Shower({count, aClick, sClick, reset}) {
    return (
    <div className='max-w-md'>
        <div className='flex items-center justify-center my-0 p-2 '>
            <button className='clickmebutton'onClick={aClick}>+</button>
            <button className='clickmebutton'onClick={sClick}>-</button>
            <button className='clickmebutton'onClick={reset}>Reset</button>
        </div>
        <div className='flex items-center justify-center my-0 p-2 '>
            <h1 className='text-2xl font-bold text-stone-800 my-0'>{count}</h1>
        </div>
    </div>
  )

}


export default Button