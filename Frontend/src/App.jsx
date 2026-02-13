import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Hero from './Components/Hero.jsx';
import NavBar from './Components/NavBar.jsx';
import ProfileDrawer from './Components/ProfileDrawer.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      {/* The Drawer sits here, invisible until triggered */}
      <ProfileDrawer/>
      <main> 
        {/* Your Page Content/Routes */}
         <Hero />
      </main>
    </BrowserRouter>
  )
}

export default App
