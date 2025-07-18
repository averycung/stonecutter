import { useState } from 'react'
import Header from './Header';
import { auth } from '../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const Reset = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState('');

  const handlereset = async (e) => {
  e.preventDefault();
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
    setError("");
  } catch (err) {
    setError(err.message);
    alert("Failed to send email");
  }
};

const navigate = useNavigate()

const handlenav = () => {
  navigate('/')
}



  return (
    <>
      <Header />
      <div className='flex items-center justify-center min-h-screen'>
        <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 
          p-1  rounded shadow w-80">
          <h1 className='p-2 ml-0 m-2 font-geist font-extralight text-lg'>Reset password</h1>
          <form onSubmit={handlereset}>
            <input
            className='w-full p-2 mb-4 border rounded'
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </form>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className='bg-stone-800 text-white p-2 px-4 mb-2 ml-1 rounded-md
        dark:bg-stone-100 dark:text-stone-800 font-bold font-geist'
        onClick={handlenav}>Back to login</button>
        </div>
      </div>
    </>
  )
}

export default Reset