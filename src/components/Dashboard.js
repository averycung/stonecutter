import Header from './Header'
import Quote from './Quote'
import Calendar from './Calendar'
import { useAuth } from '../contexts/authContext'

const Dashboard = () => {

    const {currentUser} = useAuth()
   
    return (
        <>
        <Header />
        <div className='my-20 relative'>
            <Quote />
            <h1 className='text-center font-geist mb-10 font-extralight dark:text-white h1'>
                Hi {currentUser.displayName ? currentUser.displayName : currentUser.email}
            </h1>
            <Calendar />
        </div>
        </>
    )
    }

export default Dashboard