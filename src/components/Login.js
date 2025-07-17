import React, {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'
import { IoLogoGoogle } from 'react-icons/io'
import { EyeClosed, Eye } from 'lucide-react'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [error, setError] = useState('')
    
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

    const [show, setShow] = useState(false)

    const showPass = () =>{
      setShow(!show)
    }


    return (
    <div className="flex items-center justify-center min-h-[700px]">
      <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 p-8 rounded shadow w-80">
        <h2 className="text-2xl dark:text-white font-bold mb-8 text-left">Login</h2>
        <form onSubmit={onSubmit} className="flex relative flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="p-2 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={showPass} 
          className='absolute top-1/2  -translate-y-[120%] right-2 p-1'>
            {show ? <Eye color="#6b7820" size="18px"/> : <EyeClosed color="#6b7280" size="18px"/>}
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className='text-right underline text-gray-500'>Forgot your password?</button>
          <button
            type="submit"
            className="bg-stone-700 dark:bg-stone-600 text-white py-2 rounded 
            hover:bg-stone-900 hover:dark:bg-stone-200 transition-all ease-linear duration-500"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 dark:text-white text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className='flex items-center justify-center'>
          <button
              className="bg-gglight flex items-center gap-2 w-full justify-center p-6
               py-2 text-ggdark rounded hover:bg-gglight2 dark:bg-ggdark dark:text-gglight transition-all
               ease-linear duartion-500">
              <IoLogoGoogle size="20"/> Login with Google
          </button>
        </div>
      </div>
    </div>
    )
    }

export default Login