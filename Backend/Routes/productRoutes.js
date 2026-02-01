import express from 'express';
import Product from '../Models/Product.js';


const router = express.Router();

router.post('/', async(req, res)=>{
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newProduct
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
});

router.get('/', async (req, res) => {
    try{

        //1. build a query object
        const queryObj = {...req.query}
        const excludedFields = ['sort', 'page', 'limit', 'fields']
        excludedFields.forEach(el=> delete queryObj[el]);

        let query = Product.find(queryObj);

        //B Sorting 
        if(req.query.sort){
            //if the user sends ?sort=price (low to high) or viceversa
            query = query.sort(req.query.sort);
        }else{
            //default: Show newwest products first
            query=query.sort('-createdAt');
        }

        const products = await query;

        res.status(200).json({
            status: 'Success',
            results: products.length,
            data: products
        });
    }catch(err){
        res.status(404).json({
            status: 'Fail',
            message: err.message
        });
    }
});

//get a single product by slug
router.get('/:slug', async (req, res)=>{
    try{
        //we findOne because slugs are unique
        const product = await Product.findOne({slug:req.params.slug});
        
        if(!product){
            return res.status(404).json({
                status: 'fail',
                message: 'No Product found with that slug'
            });
        }
        res.status(200).json({
        status: 'Success',
        data: product
    });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        });
    }   
});

export default router