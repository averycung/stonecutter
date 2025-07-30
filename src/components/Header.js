import {Sun, Moon} from 'lucide-react'
import { useDarkMode } from './ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebaseConfig';
import { doSignOut } from '../firebase/auth';

const Header = () => {

  const {userLoggedIn, currentUser} = useAuth()

  const {darkMode, toggleDarkMode} = useDarkMode()

  const navigate = useNavigate()


  const handleSignOut = async () => {
  try {
    await doSignOut();
    navigate('/');
  } catch (err) {
    console.error("Error signing out:", err);
  }
};


  const handleNavLogin = () => {
    navigate('/login')
  }

  const handleNavSignup = () => {
    navigate('/signup')
  }

  return (
      <div className="relative flex border-b p-2 mx-auto bg-stone-100 dark:bg-stone-800">
        <button onClick={toggleDarkMode} className='absolute top-8 right-3 rounded-md text-sm 
        text-stone-800 dark:text-white font-bold  px-2 py-2 hover:rounded-xl  transition-all 
        duration-500'>{darkMode ? <Sun/>:<Moon/>}</button>
        {userLoggedIn ? (<button onClick={handleNavLogin} className='text-stone-800 dark:text-white 
        font-dmserif font-bold m-4 p-2 text-4xl md:text-5xl transition-all ease-linear duration-500'>
        Stonecutter </button>) : (<h1 className='text-stone-800 dark:text-white font-dmserif 
        font-bold m-4 p-2 text-4xl md:text-5xl transition-all ease-linear duration-500'>
        Stonecutter</h1>)}
        {currentUser?.isAnonymous && (
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-56 bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleNavSignup}>Create an account</button>
        )}
        {currentUser?.isAnonymous && (
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-[400px] bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleNavLogin}>Login</button>
        )}
        {currentUser?.isAnonymous && (
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-14 bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleSignOut}>Sign out of guest</button>
        )}
        {userLoggedIn && !currentUser?.isAnonymous &&(
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-14 bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleSignOut}>Sign Out</button>
        )}
        {!userLoggedIn && (
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-14 bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleNavSignup}>Create an account</button>
        )}
        {!userLoggedIn && (
          <button className='absolute text-xs md:text-base top-7 md:top-6 right-60 bg-stone-800 text-white 
          p-2 px-4 m-2 rounded-md dark:bg-stone-100 dark:text-stone-800 font-extralight font-geist'
          onClick={handleNavLogin}>Login</button>
        )}
      </div>
  )

}

export default Header