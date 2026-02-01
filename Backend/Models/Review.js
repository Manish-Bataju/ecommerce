import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required:[true, 'Review can not be empty!']
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating from (1 to 5)'],
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    //Link to the Product
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a prodcut.']
    },
    //Link to the User
    userName:{
        type: String,
        required: [true, 'Please provide your name']
    }
}, {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
});

export default mongoose.model('Review', reviewSchema);