import React from 'react'
import {Sun, Moon} from 'lucide-react'

const Header = () => {

  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const changeMode = () =>{
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className={isDarkMode ? "flex justify-center items-center p-2 mx-auto bg-black" : "flex justify-center items-center p-2 mx-auto bg-white"
    }>
      <button onClick={changeMode} className='fixed top-3 right-3 rounded-md text-xl bg-stone-800
      text-white font-bold px-2 py-2 shadow-md '>{isDarkMode ? <Moon/>:<Sun/>}</button>
      <h1 className='text-stone-800 font-bold m-4 p-2 text-6xl'>Stonecutter</h1>
    </div>
  )
}

export default Header