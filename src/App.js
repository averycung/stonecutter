import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import Reset from './components/Reset';
import { useDarkMode } from './components/ThemeProvider';
import { Routes, Route } from 'react-router-dom';

function App() {
  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-[100dvh] overflow-x-hidden bg-stone-100 dark:bg-stone-800">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
