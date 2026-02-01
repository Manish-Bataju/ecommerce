import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    orderNumber:{
        type: String,
        unique: true,
        required: true,
        default: () => `ORD-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }

        }
    ],
    shippingAddress:{
        firstLine: {
            type: String,
            required: true,
        },
        wardNo: {
            type: Number,
            required: true,
        },
        landmark:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        postalCode:{
            type: String,
        },
        country:{
            type: String,
            required: true,
        }
    },

    paymentMethod:{
        type: String,
        required: true,
        enum:['COD', 'E-Sewa', 'IMEPAY-Khalti']
    },
    totalPrice: {type: Number, required:true, default: 0},
    isPaid:{type: Boolean, required:true, default: false},
    paidAt: {type: Date},

    //Tracking System Status
    trackingStatus:{
        type:String,
        enum:['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    trackingHistory:[{
        status: {type:String},
        message:{ type: String}, //Package received at Kathmandu Hub
        timeStamp: {type: Date, default: Date.now},
        location: {type:String} // chabahil kathmandu
    }],
    carrierTrackingNumber:{type: String},   // e.g., Logistics Company tracking No
    deliveredAt:{ type: Date},
    paymentResult:{
        // For eSewa/Khalti tracking
        pidx:{type: String},            // Khalti's Payment ID
        transactionId:{type: String}, // eSewa's refId / transaction UUID
        status: {type: String},        // e.g., 'Completed', 'Pending', 'User_Canceled'
    }
}, {timestamps: true});

// Middleware: Auto-populate the first tracking history entry
orderSchema.pre('save', function (next) {
    if (this.isNew && this.trackingHistory.length === 0) {
        this.trackingHistory.push({
            status: 'Pending',
            message: 'Order placed successfully and is awaiting confirmation.',
            location: 'System'
        });
    }
    next();
});

export default mongoose.model("Order", orderSchema);