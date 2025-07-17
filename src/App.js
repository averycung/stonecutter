import Header from './components/Header';
import Button from './components/Button';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import { useDarkMode } from './components/ThemeProvider';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  const {darkMode} = useDarkMode()

  return (
    <div className={darkMode ? 'dark min-h-screen bg-stone-800' : 'light min-h-screen'}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/goon" element={<Button />}></Route>
      </Routes>
    </div>
  )
}

export default App;
