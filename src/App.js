import Header from './components/Header';
import Button from './components/Button';
import Landing from './components/Landing';
import { useDarkMode } from './components/ThemeProvider';


function App() {

  const {darkMode} = useDarkMode()

  return (
    <div className={darkMode ? 'dark min-h-screen bg-stone-800' : 'light min-h-screen'}>
      <Header/>
      <Button/>
    </div>
  )
}

export default App;
