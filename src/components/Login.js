import React, {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setIsSigningIn(true)
            doSignInWithGoogle.catch(err => {
                setIsSigningIn(false)
            })
        }
    }


    return (
    <div className="flex items-center justify-center min-h-[700px]">
      <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 p-8 rounded shadow w-80">
        <h2 className="text-2xl dark:text-white font-bold mb-4 text-center">Login</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-stone-700 dark:bg-stone-100 dark:text-stone-800 text-white py-2 rounded hover:bg-stone-900 hover:dark:bg-stone-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    )
    }

export default Login