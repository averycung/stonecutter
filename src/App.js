import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Reset from './components/Reset';
import { useDarkMode } from './components/ThemeProvider';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  const {darkMode} = useDarkMode()

  return (
    <div className={darkMode ? 'dark min-h-screen bg-stone-800' : 'light min-h-screen'}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
      </Routes>
    </div>
  )
}

export default App;
