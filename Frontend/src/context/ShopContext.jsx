import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const ShopContext = createContext();

export const ShopProvider =({children})=>{
    //1. Drawer States

    const[isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    //2. User & Order States
    const [user, setUser] = useState(null);  //. when null, user is a guest.
    const [cartItems, setCartItems] = useState([]);

    //3. Header Height Tracking
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    //Effect to measure the header whenever the window resizes
   useEffect(() => {
    const handleResize = () => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight;
            console.log("📏 Header Height:", height); // Watch this in your console!
            setHeaderHeight(height);
        }
    };

    // 1. Create an observer to watch the header specifically
    const observer = new ResizeObserver(() => {
        handleResize();
    });

    if (headerRef.current) {
        observer.observe(headerRef.current);
    }

    // 2. Initial trigger
    handleResize();

    // 3. Cleanup
    return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
    };
}, []);

    return(
    <ShopContext.Provider value={{
        isProfileOpen, setIsProfileOpen,
        isCartOpen, setIsCartOpen,
        user, setUser,
        cartItems, setCartItems,
        headerHeight,   //Now available to all Drawers
        headerRef       // This is the "hook" we attach to our NavBar   
    }}>
    {children}
    </ShopContext.Provider>
    );
};

//this custom hook makes it easy to use the brain in any component.
export const useShop = () => useContext(ShopContext);