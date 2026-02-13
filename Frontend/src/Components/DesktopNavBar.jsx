import { NavLink } from 'react-router-dom';
import logo from '../assets/Pukucha_logo-01.svg';
import { ShoppingCart, CircleUser } from 'lucide-react';
import { useShop } from '../hooks/useShop';
import {motion} from 'framer-motion';

const categories = [
  { name: 'BABY', path: '/baby', age: 'NB-3M' },
  { name: 'TOTS', path: '/tots', age: '9M-18M' },
  { name: 'JUNIOR', path: '/junior', age: '2Y-4Y' },
  { name: 'KIDS', path: '/kids', age: '6Y-12Y' },
  { name: 'TEEN', path: '/teen', age: '13Y-19Y' },
  { name: 'GIFTS', path: '/gifts', age: 'Curated' },
];

export default function DesktopNavBar() {
  const { isProfileOpen, setIsProfileOpen, isCartOpen, setIsCartOpen } = useShop();
  const cartCount = 0;

  return (
    <div className='bg-navy text-white h-11 py-1 px-[clamp(0.5rem,3vw,3rem)] text-xl font-heading flex justify-between items-center shadow-[0_0_15px_rgba(0,0,0,0.2)]'>

      {/* LEFT SIDE: Logo */}
      <NavLink to='/'>
        <img src={logo} alt="Pukucha Logo" className="h-9 w-auto" />
      </NavLink>
         
         {/* Middle: Navigation Bar */}
        <div className='flex items-start'>
        <ul className='flex gap-[clamp(1.5rem,3vw,4rem)]'>
        {categories.map((cat) => (
          <li key={cat.path}>
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <NavLink 
                to={cat.path} 
                className={({ isActive }) =>
                  isActive
                    ? 'inline-block transition-transform duration-200 text-white text-xl font-semibold border-b-2 border-mauve' 
                    : 'font-normal border-b-2 border-transparent hover:scale-110'
                }
              >
                {cat.name}
              </NavLink>
              <span className="absolute -bottom-6 scale-75 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 text-sm text-mauve-light font-medium tracking-widest uppercase">
                  {cat.age}
                </span>   
            </div>
          </li>
        ))}

        <li>
          <NavLink 
            to="/clearance" 
            className={({ isActive }) => 
              isActive 
                ? 'inline-block tracking-wide transition-transform duration-200 text-amber-200 text-l font-semibold border-b-2 border-amber-200' 
                : 'inline-block transition-all duration-200 hover:scale-110 text-amber-200'
            }
          >
            <p>SALE</p>
          </NavLink>
        </li>
      </ul>
      </div>
     
      

      {/* Right Side: Icons with Toggle Logic */}
      <ul className="flex justify-center items-center gap-[clamp(1rem,2vw,1.5rem)]">
        
        {/* Cart Trigger */}
        <motion.div
          onClick={() => {
            setIsCartOpen(!isCartOpen); // Toggle
            setIsProfileOpen(false);    // Ensure profile is closed
          }}
          className='flex flex-col items-center gap-0.5 cursor-pointer hover:scale-110'
          whileTap={{ scale: 0.9 }}
        >
          <div className='relative'>
            {/* Icon turns mauve when drawer is open */}
            <ShoppingCart size={24} className={isCartOpen ? 'text-mauve' : 'text-white'} />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-mauve text-white text-[10px] px-1.5 rounded-full'>
                {cartCount}
              </span>
            )}
          </div>

          {isCartOpen && (
            <motion.div
              layoutId='cartUnderline'
              className='border-b-2 border-mauve w-full pt-1'
            />
          )}
        </motion.div>

        {/* Profile Trigger */}
        <motion.div
          onClick={() => {
            setIsProfileOpen(!isProfileOpen); // Toggle
            setIsCartOpen(false);              // Ensure cart is closed
          }}
          className='flex flex-col items-center gap-0.5 cursor-pointer hover:scale-110'
          whileTap={{ scale: 0.95 }}
        >
          <CircleUser size={24} className={isProfileOpen ? 'text-mauve' : 'text-white'} />
          
          {isProfileOpen && (
            <motion.div
              layoutId='underline'
              className='border-b-2 border-mauve w-full pt-1'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>
      </ul>
    </div>
  );
}