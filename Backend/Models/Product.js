import mongoose from "mongoose";
import badgeAssets from "../Utils/badgeAssets.js";

const variantSchema = new mongoose.Schema({
  printName: {
    type: String, // e.g., "Vintage Meadow" or "Blue Stripe"
    required: [true, "Print/Color name is required"],
    trim: true
  },
  swatchImage: {
    type: String, // URL to a tiny square crop of the actual fabric print
    required: [true, "A swatch image is required for the print Selector"]
    },
    images: [{
        type: String, //an Array Full-size photos of the product in this print
        required: true
    }],    
  inventory: [{ 
        size: {
            type: String,
            required: true,
            enum: ['New Born', '3M', '6M', '9M', '12M', '18M', '2Y', '3Y', '4Y', '6Y', '8Y', '10Y', '12Y', '13Y', '14Y', '16Y', '18Y']
            },
        stock: {
            type: Number,
            required: true,
            min: [0, "Stock cannot be negative"],
            default: 0
        }}]
});

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"A product must have a title"],
        minLength: [10, "title must be at least 10 characters long"],
        maxLength:[35, "title must be at maximum 35 characters long"],
        trim: true, //trims the sspaces before and after the string..
    },
    
    description: {
        type: String,
        required: [true," A product name must have a description"],
        minLength: [10, "Description must be at least 100 characters long"],
        trim: true,
    },
    brand:{
        type: String,
        default: "Pukucha"
    },
    gtin:{
        type: String,
        description: " Global Trade Item Number - Essential for Google Shopping Stars"
    },
    mpn: {
        type: String,
        description: " Manufacturer Part Number - Backup for GTIN"
    },

    price:{
        type: Number,
        required: [true, " A product must have a price"],
        min: [0, "Price can not be negative"],
    },
    finalPrice: {
        type: Number
    },
    discount:{
        discountType:{
            type: String,
            enum: ['Percentage', 'Fixed Amount', 'Buy One Get One Free', 'Free Shipping', 'None'],
            default: 'None'
        },
        value:{
            type: Number,
            default: 0,
            min: [0, "Discount value can't be negative"]
        },
        startDate: Date,
        endDate: Date,
    },
    gender:{
        type: String,
        required: [true, " Gender is must"],
        enum: ['Boy', 'Girl', 'Unisex'],
    },
    variants: [variantSchema],
    fabric: {
    type: String,
    required: [true, "A product must have a fabric type defined"],
    enum: {
      values: ['Organic Cotton', 'Bamboo-Blend', 'Linen', 'Merino Wool', 'Hemp', 'Muslin', 'Cotton-Blend', 'Cotton-Viscose', 'Cotton-Polyester', '100% Polyester'],
      message: '{VALUE} is not a supported fabric type'
          }
    },
    clothingCategory:{
        type: String,
        required: [true, " Category is must"],
        enum: ['Tops', 'Bottoms', 'Outerwear', 'OverAlls', 'Sleepwear', 'Accessories', 'Bundles'],
    },
    thumbnails:{
        type: String,
        required:[true, " A 50px * 50Px thumbnail is a must "],
    },
    tags:{
        type: [String],
        required: [true, " At least one tag is required"],
        enum: ['New Arrival', 'Best Seller', 'Discounted', 'Limited Edition', 'Buy One Get One Free', 'Free Shipping', 'Seasonal', 'Exclusive', 'Trending', '100% Cotton', 'Organic', 'Handmade', 'Eco-Friendly', 'Machine Washable', 'Lightweight', 'Warm', 'Breathable', 'Durable', 'Soft', 'Stretchy', 'Water-Resistant', 'UV Protection', 'Bamboo Fabric', 'Cotton Blend', 'Recycled Materials', 'Winter Collection', 'Summer', 'Winter', 'Autumn', 'Monsoon'],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },

    //Social Engagement
    likes: {
        count: {
            type: Number,
            default: 0
        },
        users: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    }
}, {timestamps: true,  // This will automatically add createdAt and updatedAt fields to the schema.
    // This allows virtuals like finalPrice to  be included in our API responses.
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
}); 

productSchema.virtual('displayBadges').get(function(){
    // we map through tags and see id we have a matching image in our utils
    return this.tags
    .filter(tag => badgeAssets[tag])
    .map(tag =>({
        name: tag,
        image: badgeAssets[tag]
    }))
});

productSchema.virtual('reviews', {
    ref: 'Review',              //the model to use
    localField: '_id',         //field in the ProductSchema
    foreignField: 'productId'  // is the field in the ReviewSchema
});

productSchema.index({clothingCategory: 1, gender: 1}); //Compound index for category and gender

productSchema.index({price: 1}); //Index on price for faster range queries

productSchema.virtual('isTrending').get(function(){
    return this.likes.count > 25;
});

// Slug Middleware to generate URL-friendly slugs from product titles.
productSchema.pre('save', function() {
    if (this.isModified('title') || this.isNew) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-');
    }
});

// 1. Logic to calculate price (we'll use this in the middleware)
const calculateFinalPrice = (product) => {
    let price = product.price;
    const { discount } = product;

    if (discount && discount.discountType !== 'None' && discount.value > 0) {
        if (discount.discountType === 'Percentage') {
            price = price - (price * (discount.value / 100));
        } else if (discount.discountType === 'Fixed Amount') {
            price = Math.max(0, price - discount.value);
        }
    }
    return price;
};

// 2. Middleware to set finalPrice before saving
productSchema.pre('save', function(next) {
    // Only recalculate if price or discount has changed
    if (this.isModified('price') || this.isModified('discount')) {
        this.finalPrice = calculateFinalPrice(this);
    }
    next();
});

export default mongoose.model("Product", productSchema);