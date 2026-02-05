import { BrowserRouter } from 'react-router-dom';
import { AnnouncementBar } from './Components/AnnouncementBar.jsx';
import './index.css';
import Hero from './Components/Hero.jsx';
import NavBar from './Components/NavBar.jsx';

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar/>
      <NavBar/>
      <main className="lg:pt-30"> 
         <Hero />
      </main>
    </BrowserRouter>
  )
}

export default App
