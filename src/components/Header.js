import React from 'react'
import {Sun, Moon} from 'lucide-react'
import { useDarkMode } from './ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut, doSendEmailVerification } from '../firebase/auth';

const Header = () => {

  const {userLoggedIn} = useAuth()

  const {darkMode, toggleDarkMode} = useDarkMode()

  const navigate = useNavigate()


  const handlesignout = async () => {
  try {
    await doSignOut();
    navigate('/');
  } catch (err) {
    console.error("Error signing out:", err);
  }
};


  const handlenav = () => {
    navigate('/dashboard')
  }

  return (
      <div className="flex p-2 mx-auto bg-white dark:bg-stone-800">
        <button onClick={toggleDarkMode} className='fixed top-3 right-3 rounded-md text-xl 
        text-stone-800 dark:text-white font-bold  px-2 py-2 hover:rounded-xl  transition-all 
        duration-500'>{darkMode ? <Sun/>:<Moon/>}</button>
        <h1 className='text-stone-800 dark:text-white font-dmserif font-bold m-4 p-2  text-5xl transtion-all ease-linear duration-500'>Stonecutter</h1>
        <button className='absolute top-2 right-40 bg-stone-800 text-white p-2 px-4 m-2 rounded-md
        dark:bg-stone-100 dark:text-stone-800 font-bold'
        onClick={handlenav}>Goon</button>
        {userLoggedIn && <button className='absolute top-2 right-72 bg-stone-800 text-white p-2 px-4 m-2 rounded-md
        dark:bg-stone-100 dark:text-stone-800 font-bold'
        onClick={handlesignout}>Sign Out</button>}
      </div>
  )

}

export default Header