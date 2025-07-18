import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { signup, loginGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'
import { IoLogoGoogle } from 'react-icons/io'
import { EyeClosed, Eye } from 'lucide-react'
import Header from './Header'

const Signup = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [error, setError] = useState('')
    
    const onSubmit = async (e) => {
      try{
        e.preventDefault()
        if(!isSigningUp) {
            setIsSigningUp(true)
            await signup(email, password)
        }
      }
      catch (err) {
            if(err.message === 'Firebase: Error (auth/invalid-credential).'){
                setError('Invalid credentials');
                setIsSigningUp(false)
            }
            else if (err.message === 'Firebase: Error (auth/email-already-in-use).'){
                setError('Email already in use');
                setIsSigningUp(false)
            }
            else {
              setError(err.message);
              setIsSigningUp(false)
            }
      }
    }

    const navigate = useNavigate()

    const handleNavGoon = () =>{
      navigate('/dashboard')
    }

    const handleNavLogin = () =>{
      navigate('/')
    }

    const onGoogleSignUp = (e) => {
            e.preventDefault()
            if(!isSigningUp){
                setIsSigningUp(true)
                loginGoogle().catch(err => {
                    setIsSigningUp(false)
                })
            }
        } 
    
    useEffect(()=>{
      if (userLoggedIn){
        navigate('/dashboard')
      }
    }, [userLoggedIn]);

    const [show, setShow] = useState(false)

    const showPass = () =>{
      setShow(!show)
    }


    return (
      <>
    <Header/>
    <div className="flex items-center justify-center min-h-[700px]">
      <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 
      p-8 pb-1 rounded shadow w-80">
        <h2 className="text-2xl dark:text-white font-geist font-extralight  mb-6 text-left">Sign up</h2>
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
          <button
            type="submit"
            className="bg-stone-700 dark:bg-stone-600 text-white py-2 rounded 
            hover:bg-stone-900 hover:dark:bg-stone-200 transition-all ease-linear duration-500">
            Sign up
          </button>
        </form>
        <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 dark:text-white text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={onGoogleSignUp}
              className="bg-gglight flex items-center gap-2 w-full justify-center p-6
               py-2 text-ggdark rounded hover:bg-gglight2 dark:bg-ggdark 
               dark:text-gglight transition-all ease-linear duration-500">
              <IoLogoGoogle size="20"/> Sign up with Google
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <button className='text-right underline text-gray-500 p-1 mt-4 mb-2'
          onClick={handleNavLogin}>Have an account? Log in</button>
        </div>
      </div>
    </div>
    </>
    )
    }

export default Signup