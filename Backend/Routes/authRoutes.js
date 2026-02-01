import express from 'express';
import {loginUSer} from '../Controllers/LoginController.js'
import {sendOTP} from '../Controllers/SendOtp.js'

const router = express.Router();

//Step 1: User enter Mobile/Email
router.post('/request-otp', sendOTP);

//Step 2: User enter the OTP received
router.post ('/login', loginUSer);

export default router;