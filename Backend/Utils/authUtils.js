import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Used Only for staff
export const matchPassword = async(enteredPassword, storedHash)=>{
    if(!enteredPassword || !storedHash){
        throw new Error ("Missing data or hash for comparision")
    }
    return await bcrypt.compare(enteredPassword, storedHash);
};

//Used only for Guests (or Password Resets)
export const generateOTP =() => {
    // Generate a 6 digit OTP Code
    return Math.floor(100000 + Math.random()* 900000).toString(); 
};

//user for Everyone once identity is proven
export const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '30d'});
};


