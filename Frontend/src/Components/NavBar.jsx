import { MobileNavBar } from './MobileNavBar.jsx';
import DesktopNavBar from './DesktopNavBar.jsx';

const NavBar = () => {
  return (
    <>
    {/* {1. Mobile: Show only on small/Medium Screens} */}
    <div className='lg:hidden'>
        <MobileNavBar/>
    </div>
    {/* 2. Desktop: Show only on large screens and up */}
    <div className='hidden lg:block fixed top-0 w-full z-50 mt-10'>
        <DesktopNavBar/>
    </div>
    </>

  )
}

export default NavBar