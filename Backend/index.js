import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './Routes/productRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import userRouter from './Routes/userRoutes.js';


dotenv.config();
const app = express();

//Middleware sections..
app.use(express.json());
app.use(cors());  //Allow React to access the API

//--------Routes Section ------
app.get('/', (req, res) => {
    res.send('API is running....');
});


// 1. Mount the Product Routes:
app.use('/api/v1/products', productRouter);

//2. Mount the Order Routes
app.use('/api/v1/orders', orderRouter);

//3. Mount the User Routes
app.use('/api/v1/users', userRouter);


//----------------Database Connection Section------
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database Connected...');
    } catch (err){
        console.error(`❌ DataBase connection failed: ${err.message}`);
        process.exit(1); //Stop the app if DB fails. 
    }  
};


//--------Server Startup ------
const PORT = process.env.PORT || 5000;

const StartServer = async()=>{
    await ConnectDB(); //wait for DB to start

    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
};

StartServer();
