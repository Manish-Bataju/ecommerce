import express from 'express';
const router = express.Router();

import {loginUser, registerStaff, setUpPassword } from '../Controllers/LoginController.js'
import {sendOTP} from '../Controllers/SendOtp.js';
import { protect } from '../Middleware/authMiddleware.js';



//-------Public Routes-------
//Step 1: User enter the OTP received
router.post ('/login', loginUser);

//Step 2: User enter Mobile/Email
router.post('/request-otp', sendOTP);
router.post('/setup-staff-password', setUpPassword)

//-----AdminOnly -------------
router.post('/admin/register-staff', registerStaff)

//-------Protected Routes-------

//only Logged in Users can hit these
router.get('/profile', protect, (req, res)=>{
    if(!req.user){
        return res.status(404).json({message: "User not found"})
    };
    //req.user comes from 'protect' middlewear
    res.status(200).json(req.user)
})

//
export default router;