import React, {useState} from 'react';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Landing = () => {

    const {userLoggedIn, currentUser} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
        await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            if(err.message === 'Firebase: Error (auth/invalid-credential).'){
                setError('Invalid credentials');
            }
            else{
                setError(err.message)
            }
        }
    };

  
  return (
    <div className="flex items-center justify-center min-h-[700px]">
      <div className="bg-white dark:bg-stone-800 dark:border-2 dark:border-stone-600 p-8 rounded shadow w-80">
        <h2 className="text-2xl dark:text-white font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
  );
}

export default Landing