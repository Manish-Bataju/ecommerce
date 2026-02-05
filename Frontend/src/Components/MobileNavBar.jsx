import { NavLink } from 'react-router-dom'
import { CircleUser, Home, ShoppingCart, Store, } from 'lucide-react'

const categories =[
  {id: 1, label: 'HOME', categoryIcon: Home, path: '/'},
  {id: 2, label: 'STORE', categoryIcon: Store, path:'/shop'},
  {id: 4, label: 'CART', categoryIcon: ShoppingCart, path:'/cart'},
  {id: 3, label: 'PROFILE', categoryIcon: CircleUser, path:'/profile'}
]
export const MobileNavBar = () => {
  return (
    <nav className="fixed bottom-1 inset-x-0 mx-auto z-50 w-full">
        <ul className='max-md:py-2 bg-navy backdrop-blur-xl border-white px-6 py-3 flex justify-between items-center shadow-2xl'>
            {categories.map(({id, label, categoryIcon, path })=>{
              const Icon = categoryIcon;
            return(
              <li key={id}>
                <div className='flex flex-col items-center gap-1 '>
                  <NavLink to={path} className={({isActive})=>`'transition-all duration-200'
                  ${isActive
                  ? 'font-semibold text-xl text-white border-b-3 pb-1.5 border-mauve'
                  :  'text-white hover:scale-110 hover:text-white'}`}>
                  {/* 1. Render the Icon here */}
                  <Icon size={25}/> 
                </NavLink>
                {/* 2. Render the label here */}
                <span className="text-white text-[12px] font-medium font-body tracking-wider">{label}</span>
                </div>
                
                </li>
            ); })}
        </ul>
    </nav>
  )
}
