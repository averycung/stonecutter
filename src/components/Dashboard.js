import Header from './Header'
import Quote from './Quote'
import Calendar from './Calendar'
import Cal from './Cal'
import { useAuth } from '../contexts/authContext'

const Dashboard = () => {

    const {currentUser} = useAuth()
   
    return (
        <>
        <Header />
        <div className='my-20 relative'>
            <Quote />
            <div className='md:flex md:items-center md:justify-center'>
            <h1 className='md:absolute md:top-10 text-center font-geist mb-10 font-extralight dark:text-stone-300 h1'>
            {currentUser.displayName ? currentUser.displayName : currentUser.email ? currentUser.email : ""}
            </h1>
            </div>
            <Calendar />
        </div>
        </>
    )
    }

export default Dashboard