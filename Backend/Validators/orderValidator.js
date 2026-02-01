import {z} from 'zod';

//define the schema for individual items in the cart..
const orderItemSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    quantity: z.number().int().positive("Quantity must be atleast 1"),
    image: z.string().min(1, "Image Url is required"),
    price: z.number().positive("Price must be greater than 0"),
    product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID") //validates MongoDB ObjectID
});

//Define the schema for the shipping details
const shippingAddressSchema = z.object({
    firstLine: z.string().min(1, "Street Address/ Tole is required"),
    wardNo: z.number().int().positive("Ward no must be positive"),
    landmark: z.string().min(1, "Landmark is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().optional().nullable(),
    country:z.string().min(1).default("Nepal")
});

//The main order validator
export const orderZodSchema = z.object({
    orderItems:z.array(orderItemSchema).min(1, "your cart is empty"),
    shippingAddress: shippingAddressSchema,
    paymentMethod: z.enum(['COD', 'E-Sewa', 'IMEPAY-Khalti'],{
        error_Map: () => ({message: "Pleae Select a valid payment method"})
    }),
    totalPrice:z.number().nonnegative()
});

export const validateOrder = (req, res, next)=>{
    try{
        // parse() will throw an error if validation fails
        orderZodSchema.parse(req.body);
        next();
    }catch(err){
        //return the first error message to the frontend
        return res.status(400).json({
            status: 'false',
            message: err.errors[0].message
        })
    }
}