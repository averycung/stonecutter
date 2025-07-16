import React from 'react'
import {Sun, Moon} from 'lucide-react'
import { useDarkMode } from './ThemeProvider';

const Header = () => {

  const {darkMode, toggleDarkMode} = useDarkMode()

  return (
      <div className="flex justify-center items-center p-2 mx-auto bg-white dark:bg-stone-800">
        <button onClick={toggleDarkMode} className='fixed top-3 right-3 rounded-md text-xl 
        text-stone-800 dark:text-white font-bold px-2 py-2 hover:rounded-xl  transition-all duration-500'>{darkMode ? <Sun/>:<Moon/>}</button>
        <h1 className='text-stone-800 dark:text-white font-bold m-4 p-2 text-6xl transtion-all ease-linear duration-500'>Stonecutter</h1>
      </div>
  )

}

export default Header