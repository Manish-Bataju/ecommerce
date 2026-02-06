import { BrowserRouter } from 'react-router-dom';
import { AnnouncementBar } from './Components/AnnouncementBar.jsx';
import './index.css';
import Hero from './Components/Hero.jsx';
import NavBar from './Components/NavBar.jsx';
import ProfileDrawer from './Components/ProfileDrawer.jsx';

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar/>
      <NavBar/>
      {/* The Drawer sits here, invisible until triggered */}
      <ProfileDrawer/>
      <main className="lg:pt-30"> 
        {/* Your Page Content/Routes */}
         <Hero />
      </main>
    </BrowserRouter>
  )
}

export default App
