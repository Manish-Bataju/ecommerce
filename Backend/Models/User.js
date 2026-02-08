import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },

    LastName:{
        type: String,
        required: true,
    },

    UserName:{
        type: String,

    },  

    Avatar:{
        type: String,
        default: "", //default avatar URL can be set here.
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // good practice to store emails in lowercase.
    },
    // A history of every email used:
    EmailHistory:[{
        type: String,
        lowercase: true,
    }],
    
    Password: { 
        type: String,        
    },

    Mobile: {
    type: String,
    required: true,
    unique: true, //Crucial for OTP Login
    trim:true
    },

    otpDetails:{
        otp: {type: String,},
        otpExpires: {type: Date},
        pendingEmail: String // This is crucial for your Email Swap logic
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    Role: {
    type: String,
    enum:['Super User', 'Designer', 'Accountant', 'Manager', 'Inventory', 'Sales', 'Delivery',  'Customer', 'Guest'],
    default: 'Guest', //If no role is specified, the Guest will be assigned the 'User' role by default.
    
    },

    Designation:{
        type: String,
        trim: true,
        required: function(){
                    return this.Role != 'Customer';} //return this.role only if the user is not a customer.
    },
    
}, {timestamps: true}); // This will automatically add createdAt and updatedAt fields to the schema.

    userSchema.methods.matchPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.Password);
    }

    userSchema.pre('save', async function(next){
        //Only hash this password if it has been modified or is new
        if(!this.isModified('Password') && this.Password){

        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        }
        
        //also handle userName generation here 
        if(this.FirstName && this.LastName){
         this.userName = this.FirstName.charAt(0).toLowerCase() + "." + this.LastName.toLowerCase();
        }
        next();
    });

    // 2. Adding a method to compare passwords
    userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

export default mongoose.model("User", userSchema);
