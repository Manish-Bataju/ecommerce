import { MobileNavBar } from './MobileNavBar.jsx';
import DesktopNavBar from './DesktopNavBar.jsx';
import ProfileDrawer from './ProfileDrawer.jsx';
import CartDrawer from './CartDrawer.jsx';
import { useShop } from '../context/ShopContext.jsx';


const NavBar = () => {
  const { headerRef } = useShop();
  return (
    <>
    <header ref={headerRef} className="fixed top-0 w-full z-1001">
    {/* {1. Mobile: Show only on small/Medium Screens} */}
    <div className='lg:hidden'>
        <MobileNavBar/>
    </div>
    {/* 2. Desktop: Show only on large screens and up */}
    <div className='hidden lg:block top-0 w-full z-50 mt-10'>
        <DesktopNavBar/>
    </div>
    </header>
    <ProfileDrawer/>
    <CartDrawer/>
  
    </>
  )
}

export default NavBar