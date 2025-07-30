import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { loginAnon } from '../firebase/auth'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/authContext'

const Landing = () => {

  const { userLoggedIn } = useAuth()

  const [isSigningIn, setIsSigningIn] = useState(false)

  const navigate = useNavigate()

  const handleNavSignup = () =>{
    navigate('/signup')
  }

  const handleNavLogin = () =>{
    navigate('/login')
  }

  const onAnonSignIn = (e) =>{
        e.preventDefault()
        if(!isSigningIn){
          setIsSigningIn(true)
          loginAnon().catch(err => {
            setIsSigningIn(false)
          })
        }
      }

  useEffect(() => {
        if (userLoggedIn){
          navigate('/dashboard')
        }
      }, [userLoggedIn]);

  return (
    <>
    <Header />
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center mt-5 p-5'>
        <span className='font-dmserif text-stone-800 dark:text-stone-100 
        text-6xl font-bold'>
          Habit Tracking Made Simple
        </span>
      </div>
      <div className='flex items-center justify-center mb-5'>
        <span className='font-geist font-extralight text-stone-800 dark:text-stone-100 
        text-lg'>
          Struggling to stay consistent? Visualize your habits now
        </span>
      </div>
        <button onClick={onAnonSignIn} className='max-w-sm p-2 m-2 bg-stone-800 
        text-white font-dmserif rounded-md text-lg'>
          ⚒️ Continue to dashboard
        </button>
    </div>
    </>
  )
}

export default Landing