import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { login, loginGoogle, loginAnon } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'
import { IoLogoGoogle } from 'react-icons/io'
import { BsIncognito } from 'react-icons/bs'
import { EyeClosed, Eye } from 'lucide-react'
import Header from './Header'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [error, setError] = useState('')
    
    const onSubmit = async (e) => {
      try{
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await login(email, password)
        }
      }
      catch (err) {
            if(err.message === 'Firebase: Error (auth/invalid-credential).'){
                setError('Invalid credentials');
                setIsSigningIn(false)
            }
            else{
                setError(err.message)
                setIsSigningIn(false)
            }
      }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setIsSigningIn(true)
            loginGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
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

    const navigate = useNavigate()

    const handleNavSignup = () =>{
      navigate('/signup')
    }

    const handleNavReset = () =>{
      navigate('/reset')
    }

    

    const [show, setShow] = useState(false)

    const showPass = () =>{
      setShow(!show)
    }

    useEffect(() => {
      if (userLoggedIn){
        navigate('/dashboard')
      }
    }, [userLoggedIn]);


    return (
      <>
    <Header/>
    <div className="flex items-center justify-center min-h-[85vh]">
      <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 
      p-8 pb-1 rounded shadow w-80">
        <h2 className="text-2xl dark:text-white mb-6 text-left font-dmserif
        font-bold text-stone-800">Login</h2>
        <form onSubmit={onSubmit} className="flex relative flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='relative'>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="p-2 rounded border w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={showPass} 
            className='absolute top-2 right-2 p-1'>
              {show ? <Eye color="#6b7820" size="18px"/> : <EyeClosed color="#6b7280" size="18px"/>}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="button" className='font-geist font-extralight text-right text-xs mt-0
          dark:text-stone-400 text-gray-500' 
          onClick={handleNavReset}>Forgot password?</button>
          <button
            type="submit"
            className="font-geist font-extralight bg-stone-800 dark:bg-stone-600 text-white py-2 
            hover:bg-stone-900 hover:dark:bg-stone-700 rounded transition-all ease-linear duration-500">
            Login
          </button>
        </form>
        <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 dark:text-white text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={onGoogleSignIn}
            className="bg-gglight font-geist font-extralight flex items-center gap-2 w-full justify-center p-6
              py-2 text-ggdark rounded hover:bg-gglight2 dark:bg-ggdark dark:text-gglight 
              hover:dark:bg-red-700 transition-all ease-linear duration-500">
            <IoLogoGoogle size="20"/> Login with Google
          </button>
        </div>
        <div className='flex items-center mt-4 justify-center'>
          <button onClick={onAnonSignIn}
            className="font-geist font-extralight flex items-center gap-2 w-full justify-center p-6
              py-2 rounded bg-anon dark:bg-anondark dark:text-anon text-anondark hover:bg-anon2 
              hover:dark:bg-blue-800 transition-all ease-linear duration-500">
            <BsIncognito size="20"/> Login with no account
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <button className='text-right font-geist font-extralight underline text-gray-500 
          dark:text-stone-400 p-1 mt-2 mb-2'
          onClick={handleNavSignup}>Don't have an account? Sign up</button>
        </div>
      </div>
    </div>
    <div className='text-center font-geist font-extralight text-stone-800 dark:text-stone-400'>
      We're <a href="https://github.com/averycung/stonecutter"
      target="_blank" className='underline font-normal'>open source</a>
    </div>
    </>
    )
    }

export default Login