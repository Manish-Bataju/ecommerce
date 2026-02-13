import User from "../Models/User.js";
import { sendEmail, sendSMS } from "../Utils/messagingUtils.js";
import { generateOTP } from "../Utils/authUtils.js";


export const sendOTP = async(req, res, next)=>{
    const {Mobile, Email} = req.body;
try{
//1. find the user by Mobile
const user = await User.findOne({Mobile});
if(!user) return res.status(404).json({message: "Mobile number is not registered."});

//2. Flexible Email Logic:
//if the provided email is different. we prepare to update it but we dont block the user..
   let targetEmail = Email.toLowerCase();
   const isNewEmail = user.Email !== targetEmail; // Define this variable!

//3. Generate First ..
const otpCode = generateOTP();
const expires = Date.now() + 5*60*1000; //code expires in 5 minutes

//4. Save OTP & "Pending Email" to user record
user.otpDetails = {
    otp: otpCode,
    otpExpires: expires,
    pendingEmail: targetEmail  // Store only if it's different
};

await user.save();

//5. Send to both Phone and New Email provided simultaneously

    console.log(`DEBUG: OTP for ${Mobile} is [ ${otpCode} ]`);
    
    await Promise.all([
        
        //Send SMS (Replace with your SMS gateway like Sparrow SMS or Akash SMS)
        sendSMS (Mobile, `Your OTP code is: ${otpCode}`),

        //Send Email
        sendEmail(targetEmail, {
            subject: "Your Login OTP",
            message: `Your code is ${otpCode}. 
            ${isNewEmail
            ? "Since this is a new email, it will be updated on your profile after verification." 
            : ""}`
        })
    ]);

    return res.status(200).json({
        message: isNewEmail
        ? "New email detected. OTP sent to your mobile and new email address."
        : "OTP sent Successfully to your mobile and email."
    });

} catch (error){
    console.error("OTP Send Error:", error);
    // Important: If this fails, it might be due to an invalid email address or SMS gateway down
    return res.status(500).json({message: "Failed to send OTP. Please check your details and try again."})
}

};



