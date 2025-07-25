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
      <div className='flex items-center justify-center my-[15%]'>
        <div className="bg-white top-10 dark:bg-stone-800 dark:border-2 dark:border-stone-600 
          p-1  rounded shadow w-80">
          <h1 className='p-2 ml-0 m-2 dark:text-stone-100 font-geist font-extralight text-lg'>Reset password</h1>
          <form onSubmit={handlereset}>
            <input
            className='w-[90%] p-2 ml-1 mr-1 mb-4 border rounded'
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </form>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className='bg-stone-800 text-white p-2 px-4 mb-2 ml-1 rounded-md
        dark:bg-stone-100 dark:text-stone-800 font-geist font-extralight transition-all ease-linear duration-500'
        onClick={handlenav}>Back to login</button>
        </div>
      </div>
    </>
  )
}

export default Reset