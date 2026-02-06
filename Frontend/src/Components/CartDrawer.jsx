import {motion, AnimatePresence} from 'framer-motion';
import { useShop } from '../context/ShopContext.jsx';
import {X, Plus, Minus, Trash2, ShoppingBag} from 'lucide-react';


const CartDrawer = () => {
    const {isCartOpen, setIsCartOpen, cartItems, headerHeight} = useShop();

    // Calculate total price
    const total = cartItems.reduce((acc, item)=> acc + item.price*item.quantity, 0)
  return (
    <AnimatePresence>
        {isCartOpen && (
            <>
            {/* Overlay- matches Profile Drawer for consistency */}
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: .1}}
            exit={{opacity: 0}}
            onClick={()=>setIsCartOpen(false)}
            className='fixed inset-0 bg-white/10 backdrop-blur-md z-999'
            style={{
                top: `${headerHeight}px`, // Announcement Bar height + Navbar height
            height: `calc(100vh - ${headerHeight}px)` // Subtract the same amount from total height
            }}
            />

            {/* Cart Drawer */}
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

            {/* Header */}
            <div className='p-6 border-b border-gray-100 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <ShoppingBag size={20}/>
                    <h2 className='text-xl font-bold tracking-tight'>Your bag ({cartItems.length})</h2>
                </div>

                <button 
                onClick={()=>setIsCartOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
                >
                    <X size={20}/>
                </button>
            </div>

            {/* Scrollable items Area */}
            <div className='flex overflow-y-auto p-6 space-y-6'>
                {cartItems.length > 0?(
                    cartItems.map((item)=>(
                        <motion.div
                        layout key={item.id}
                        className='flex gap-4 items-start'>
                        <img src={item.image} alt={item.name} className='w-20 h-24 object-cover rounded-xl bg-gray-20'/>
                        <div className='flex-1'>
                            <h3 className='font-semibold text-navy'>{item.name}</
                            h3>
                            <p className='text-sm text-gray-400 mb-2'>{item.size ||  'One Size'}</p>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center border rounded-lg'>
                                    <button className='p-1 hover:text-mauve'><Minus size={14} /></button>
                                    <span className='px-2 text-sm font-medium'>{item.quantity}</span>
                                    <button  className='p-1 hover:text-mauve'><Plus size={14}/></button>
                                </div>
                                <span className='font-bold text-navy'>{item.price}</span>
                            </div>
                        </div>
                        </motion.div>
                    ))
                ):(
                    <div className='h-full w-full flex flex-col items-center justify-center text-center space-y-4'>
                        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center'>
                        <ShoppingBag size={32} className='text-gray-300'/>
                        </div>
                        <p>Your bag is Empty. <br/>
                        Time to go surfing!</p>
                        <button 
                        onClick={()=>setIsCartOpen(false)}
                        className='text-mauve font-semibold underline'>Continue Shopping</button>
                    </div>
                )}
            </div>

            {/* Footer- CheckOut Section*/}
            {cartItems.length > 0 && (
                <div className='p-6 border-t border-gray-100 bg-gray-50/50'>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-500'>SubTotal</span>
                    <span className='text-xl font-bold text-navy'>${total.toFixed(2)}</span>
                </div>
                <p className='text-xs text-gray-400 mb-6'>Shipping and taxes Calculated at checkout</p>
                <button className='w-full ng-navy text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-lg shadow-navy/20 '>Checkout Now</button>
                </div>
            )}

            </motion.div>            
            </>
        )}
    </AnimatePresence>
  );
};

export default CartDrawer;