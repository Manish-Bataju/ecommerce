
//Used Only for staff
export const matchPassword = async(enteredPassword, storedHash)=>{
    return await bcrypt.compare(enteredPassword, storedHash);
};

//Used only for Guests (or Password Resets)
export const generateOTP =() => {
    return Math.floor(1000 + Math.random()*9000).toString(); 
};

//user for Everyone once identity is proven
export const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
};