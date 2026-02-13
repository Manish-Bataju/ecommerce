import { NavLink } from 'react-router-dom';
import { CircleUser, Home, ShoppingCart, Store } from 'lucide-react';
import { useShop } from '../hooks/useShop'; // 1. Import your context hook

const categories = [
  { id: 1, label: 'HOME', categoryIcon: Home, path: '/' },
  { id: 2, label: 'STORE', categoryIcon: Store, path: '/shop' },
  { id: 4, label: 'CART', categoryIcon: ShoppingCart, isDrawer: true }, // Added flag
  { id: 3, label: 'PROFILE', categoryIcon: CircleUser, isDrawer: true } // Added flag
];

export const MobileNavBar = () => {
  const { setIsCartOpen, setIsProfileOpen, isCartOpen, isProfileOpen } = useShop(); // 2. Get setters and state

  return (
    <nav className="fixed bottom-1 inset-x-0 mx-auto z-1002 w-full"> {/* Increased z-index to stay above drawers */}
      <ul className='max-md:py-2 bg-navy backdrop-blur-xl border-white px-6 py-3 flex justify-between items-center shadow-2xl rounded-t-2xl'>
        {categories.map(({ id, label, categoryIcon, path, isDrawer }) => {
          const Icon = categoryIcon;

          // Check if this specific item's drawer is currently open to show the active style
          const isActiveDrawer = (label === 'CART' && isCartOpen) || (label === 'PROFILE' && isProfileOpen);

          const activeClass = 'font-semibold text-white border-b-2 pb-1.5 border-mauve';
          const inactiveClass = 'text-white hover:scale-110';

          return (
            <li key={id}>
              <div className='flex flex-col items-center gap-1'>
                {isDrawer ? (
                  /* 3. Render a BUTTON for Drawers */
                
                <button
                  onClick={() => {
                  if (label === 'CART') {
                    // If already open, close it. If closed, open it.
                    setIsCartOpen(!isCartOpen); 
                    setIsProfileOpen(false); // Close profile if we're opening cart
                  } else {
                    setIsProfileOpen(!isProfileOpen);
                    setIsCartOpen(false); // Close cart if we're opening profile
                  }
                }}
                className={`transition-all duration-200 ${isActiveDrawer ? activeClass : inactiveClass}`}
                >
                <Icon size={25} />
                </button>
                ) : (
                  /* 4. Render a NavLink for Pages */
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `transition-all duration-200 ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    <Icon size={25} />
                  </NavLink>
                )}
                <span className="text-white text-[12px] font-medium font-body tracking-wider">{label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};