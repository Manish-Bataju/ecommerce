import { useShop } from '../context/ShopContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProfileDrawer = () => {
    const {isProfileOpen, setIsProfileOpen, user, headerHeight} = useShop();
  return (
    <AnimatePresence>
        {isProfileOpen && (
        <>
        {/* The overlay darkens the screen         */}
        <motion.div
        initial = {{opacity: 0}}
        animate = {{opacity: .15}}
        exit = {{opacity: 0}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick= {()=>setIsProfileOpen(false)}
        className="fixed inset-0 bg-white/10 backdrop-blur-md z-999"
        />

        {/* The Drawer */}
        <motion.div
        /* ANIMATION LOGIC: Side on desktop, Up on mobile */
            initial={window.innerWidth < 1024 ? { y: '100%' } : { x: '100%' }}
            animate={window.innerWidth < 1024 ? { y: 0 } : { x: 0 }}
            exit={window.innerWidth < 1024 ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            
            className={`
                fixed bg-white shadow-2xl z-1000 flex flex-col
                
                /* MOBILE SETTINGS */
                bottom-0 left-0 right-0 w-full rounded-t-4xl h-[85vh]
                
                /* DESKTOP (lg) SETTINGS */
                lg:top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-85 lg:rounded-none
            `}
            style={window.innerWidth >= 1024 ? {
                top: `${headerHeight}px`,
                height: `calc(100vh - ${headerHeight}px)`
            } : {}} // On mobile, we don't need the top:headerHeight offset
>
        
        <div className='flex flex-col px-8 w-full h-full mt-5'>
            {/* Header of Drawer */}
            <div className='flex justify-between  items-center mb-10'>
                <h2 className='text-2xl font-bold tracking-tight'
                >{user ? 'My Profile' :'Account'}</h2>
                <button
                onClick={()=>setIsProfileOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                <X size={24}/>
                </button>
            </div>

            {/* Content of the Drawer */}
            <div>
                {user ? (
                    <div>
                        <p className='text-lg'> <span className="text-mauve font-semibold">{user.name}</span></p>
                        {/* Order history would go here */}
                    </div>
                ):(
                    <div className='space-y-6'>
                        <p className='text-navy font-body'>Login to track and Manage your cart </p>
                        <button className='w-full bg-navy text-white py-3 rounded-xl font-bold font-heading text-lg hover:cursor-pointer hover:text-amber-200 hover:text-2xl'>Login</button>
                        <button className='w-full border-2 text-navy border-navy py-3 rounded-xl text-lg font-bold font-heading hover:bg-navy transition-all hover:cursor-pointer hover:text-amber-200 hover:text-xl'>Create Account</button>
                    </div>
                )}
            </div>

            {/* Footer of the Drawer */}
            <div className='pt-6 border-t text-s text-wrap text-black'>
                <p>2026 Pukucha- a Clothing Store. <br/>
                    All rights reserved</p>
            </div>
        </div>
         </motion.div>   
        </>
        )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;