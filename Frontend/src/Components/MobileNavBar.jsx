import { NavLink } from 'react-router-dom'

export const MobileNavBar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-100">
        <div className='bg-navy/90 backdrop-blur-xl border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl'>
            <NavLink to='/' className="text-white flex flex-col items-center gap-1">Shop</NavLink>
        </div>
    
    </nav>
  )
}
