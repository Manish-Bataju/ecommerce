import express from 'express';
const router = express.Router();

import {loginUSer} from '../Controllers/LoginController.js'
import {sendOTP} from '../Controllers/SendOtp.js';
import { loginUser } from '../Controllers/LoginController.js';
import { protect } from '../Middleware/authMiddleware.js';



//-------Public Routes-------
//Step 1: User enter the OTP received
router.post ('/login', login);

//Step 2: User enter Mobile/Email
router.post('/request-otp', sendOTP);

//step 3. Verify OTP
router.post('/loginUser', loginUser);

//-------Protected Routes-------

//only Logged in Users can hit these
router.get('/profile', protect, (req, res)=>{
    //req.user comes from 'protect' middlewear
    res.status(200).json(req.user)
})
export default router;