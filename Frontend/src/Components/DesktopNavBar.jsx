import { NavLink} from 'react-router-dom';
import logo from '../assets/Pukucha_logo-01.svg';
import { ShoppingCart, CircleUser } from 'lucide-react';

const categories = [
  { name: 'BABY', path: '/baby', age: 'NB-3M' },
  { name: 'TOTS', path: '/tots', age: '9M-18M' },
  { name: 'JUNIOR', path: '/junior', age: '2Y-4Y' },
  { name: 'KIDS', path: '/kids', age: '6Y-12Y' },
  { name: 'TEEN', path: '/teen', age: '13Y-19Y' },
  { name: 'GIFTS', path: '/gifts', age: 'Curated' },
];


export default function DesktopNavBar() {
  return (
    <div className='bg-navy text-white py-1.5 px-[clamp(0.5rem,3vw,3rem)] text-xl font-heading flex justify-between shadow-[0_0_15px_rgba(0,0,0,0.2)]'>

    {/* LEFT SIDE: Logo */}
    <NavLink to='/'><img src={logo} alt="Pukucha Logo" className="h-12 w-auto" /></NavLink>

     {/* Middle: Navigation Bar */}
    <ul className='flex justify-center gap-[clamp(1.5rem,3vw,4rem)]'>
        {categories.map((cat)=>(
          <li key={cat.path} >
            <div className='flex flex-col items-center justify-center gap-.75 '>
             <NavLink to={cat.path} className={({isActive})=>
            isActive ? 'inline-block font-semibold text-xl text-white border-b-2 border-mauve tracking-wider transition-all duration-200 ' : 'inline-block tracking-wider  hover:scale-110 hover:text-white'
          }>{cat.name}</NavLink>
          <span className='text-[.9rem] text-amber-200'>
            ({cat.age})
          </span>
          </div>
          </li>
          ))}
            
        <li className='tracking-wide'>
          <NavLink to="/clearance" className={({isActive})=> isActive? 'inline-block transition-transform duration-200 text-amber-200 text-xl font-semibold border-b-2 border-amber-200': 'inline-block transition-all duration-200 hover:scale-110 text-amber-200 hover:text-amber-200 hover:border-amber-200'}><em>CLEARANCE</em></NavLink></li>
    </ul>
          {/* Right Side: Nav Bar */}
    <ul className="flex justify-center items-center gap-[clamp(1rem,2vw,2rem)]">
      {/* Cart */}
      <NavLink to='/cart' className={({isActive})=>
      isActive ? 'inline-block font-semibold text-xl text-white border-b-2 pb-1 border-mauve tracking-wider transition-all duration-200 ' : 'inline-block tracking-wider  hover:scale-110 hover:text-white'}> <ShoppingCart/></NavLink>

      {/* Profile / Avatar */}
      <NavLink to='/profile' className={({isActive})=>
      isActive ? 'inline-block font-semibold text-xl text-white border-b-2 pb-1 border-mauve tracking-wider transition-all duration-200 ' : 'inline-block tracking-wider  hover:scale-110 hover:text-white'}><CircleUser/></NavLink>
    </ul>
    </div>
  )
}
