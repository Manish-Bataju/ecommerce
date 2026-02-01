import jwt from 'jsonwebtoken';
import User from '../Models/user.js'

export const protect = async(req, res, next)=>{
    let token;

    //1. Check if token exists in headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //2. Extract the token (Remove "Beare" part)
            token = req.headers.authorization.split(' ')[1];

            //3. verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //4. Attach user to request(inus the password)
            req.user = await User.findById(decoded.id).select('-password');

            // Move to the validator or controller
            next(); 
        }catch(error){
            console.error(error)
            res.status(401).json({
                message: 'Not Authorized, token failed'
            });
        }
    }
    if(!token){
        res.status(401).json({message: 'Not Authorized, no token'});
    }
}