import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar.jsx'
import Footer from '../Components/Footer.jsx'

const RootLayout = () => {
  return (
    <div className='app-container'>
        {/* stays at the top forever */}
            <NavBar/>

            <main>
            {/* this is where we plugin our home, baby, product pages plugin */}
            <Outlet/>
            </main>

        <Footer/>
    </div>
  )
}

export default RootLayout