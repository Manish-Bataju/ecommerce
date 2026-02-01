import Order from '../Models/Order.js';
import Product from '../Models/Product.js';
import axios from 'axios';

export const createOrder = async (req, res)=>{
 try{
    const {orderItems, shippingAddress, paymentMethod} = req.body;

    if(!orderItems || orderItems.length === 0){
        return res.status(400).json({message: "No Order Items"});
    }

    //1. Calculate prices and verify stock
    let total = 0;
    const verifiedItems = [];

        //1. Calculate and verify(don't update Stock)
    for(const item of orderItems){
        const product = await Product.findById(item.product);

        if(!product){
            return res.status(404).json({
              message: `Product ${item.name} not found`
            });
        }

        // --- NEW SUGGESTION START: FIND SPECIFIC SIZE/COLOR STOCK ---
      const variant = product.inventory.find(
        (inv) => inv.size === item.size && inv.color.name === item.color
      );

      if (!variant) {
        return res.status(400).json({ 
          message: `${item.name} does not exist in ${item.size}/${item.color}` 
        });
      }

      if (variant.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.title} (${item.size})` 
        });
      }
      // --- NEW SUGGESTION END ---

      // Use product.finalPrice (your virtual) instead of product.price
      const itemPrice = product.finalPrice;
        total+= product.price*item.quantity;
        verifiedItems.push({
            product: item.product,
            name: product.name,
            image: product.images? product.images[0] : "",
            price: product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color
        });

    }

    //Create the order document
    const order = new Order({
        user: req.user._id,             //from your auth Middleware
        orderItems: verifiedItems, shippingAddress, paymentMethod,
        totalPrice: total,
        //if COD, isPaid is false. if digital, we handle that in a seperate logic.
        isPaid: false
    });

    const savedOrder = await order.save();


    //3.The payment branch
    //if COD: update stock immediately and return succcess
    if(paymentMethod ==='COD'){
        for (const item of verifiedItems){
        // This finds the exact product AND the exact size/color variant to decrement
            await Product.updateOne(
                { 
                    _id: item.product, 
                    "inventory.size": item.size, 
                    "inventory.color.name": item.color 
                },
                { 
                    $inc: { "inventory.$.stock": -item.quantity } 
                }
            );
        }
        return res.status(201).json({ message: "Order Placed (COD)", order: savedOrder });
    }

    // --- KHALTI BRANCH ---
    if(paymentMethod === 'IMEPAY-Khalti'){
            const khaltiResponse = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",
            {
                return_url: `${process.env.FRONTEND_URL}/payment-verify`,
                website_url:    process.env.FRONTEND_URL,
                amount: total*100,  //Khalti uses paisa
                purchase_order_id: savedOrder._id,
                purchase_order_name: `Order ${savedOrder.orderNumber}`
            },
            {headers: {'Authorization': `key ${process.env.KHALTI_SECRET_KEY}`}});

            //Store PIDX so we can verify the payment later
            savedOrder.paymentResult = {pidx: khaltiResponse.data.pidx};
            await savedOrder.save();

            return res.status(200).json({
                success: true,
                paymentUrl: khaltiResponse.data.payment_url,
                orderID: savedOrder._id
            });
        }
    
    //if E-Sewa: (Signature logic is slightly complex, usually handled via frontend)
    if( paymentMethod === 'E-Sewa'){
        return res.status(200).json({
            message: "Proceed to esewa payment",
            order: savedOrder
        });
    }

}catch(err){
    console.log("Order Creation Error:", err.response?.data || err.message);
    res.status(500).json({message: err.message})
}

}

export const verifyKhaltiPayment = async (req, res) => {
    try {
        const { pidx } = req.body;

        if (!pidx) {
            return res.status(400).json({ message: "No pidx provided" });
        }

        const response = await axios.post(
            "https://a.khalti.com/api/v2/epayment/lookup/",
            { pidx },
            { headers: { 'Authorization': `key ${process.env.KHALTI_SECRET_KEY}` } }
        );

        if (response.data.status === 'Completed') {
            const order = await Order.findById(response.data.purchase_order_id);
            
            if (order && !order.isPaid) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    pidx: response.data.pidx,
                    transactionId: response.data.transaction_id,
                    status: response.data.status
                };
                await order.save();

                for (const item of order.orderItems) {
                    await Product.updateOne(
                        { _id: item.product, "inventory.size": item.size, "inventory.color.name": item.color },
                        { $inc: { "inventory.$.stock": -item.quantity } }
                    );
                } // Loop closed correctly
            }
            return res.status(200).json({ success: true, message: "Payment Successful" });
        }

        res.status(400).json({ success: false, message: "Payment Not Completed", details: response.data });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};