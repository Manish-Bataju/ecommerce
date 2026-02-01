import express from 'express';
import Review from '../Models/Review.js';

const router = express.Router();

//create a review
router.post('/', async (req, res)=>{
    try{
        const newReview = await Review.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: newReview
        });
    } catch(err){
        res.status(400).json({
            status: 'Fail',
            message: err.message
        });
    }
});

//get all reviews ...
router.get('/', async(req, res)=>{
    const reviews = await Review.find().populate('product', 'title');
    res.status(200).json({
        status: 'Success',
        data: reviews
    });
});

export default router;