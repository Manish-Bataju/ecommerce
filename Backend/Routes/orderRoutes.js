import express from 'express';
import { createOrder } from '../Controllers/orderController.js';
import {verifyKhaltiPayment} from '../Controllers/orderController.js';
import { protect } from '../Middleware/authMiddleware.js';
import { validateOrder } from '../Validators/orderValidator.js'; //ZOD Middleware

const router = express.Router();

//1. create a new order (Protected by JWT and Zod)
router.post('/', protect, validateOrder, createOrder);

//2. verify Khalti Payment (This is what the frontend calls aafter redirect)
router.post('/verify-khalti', protect, verifyKhaltiPayment);

export default router;