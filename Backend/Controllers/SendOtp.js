import User from "../Models/User.js";

export const sendOTP = async(req, res, next)=>{
    const {Mobile, Email} = req.body;
try{
//1. find the user by Mobile
const user = await User.findOne({Mobile});
if(!user) return res.status(404).json({message: "Mobile number is not registered."});

//2. Flexible Email Logic:
//if the provided email is different. we prepare to update it but we dont block the user..
   let targetEmail = Email.toLowerCase();

//3.  Generate a 6 digit OTP Code
const otpCode = Math.floor(100000 + Math.random()* 900000).toString();
const expires = Date.now() + 5*60*1000; //code expires in 5 minutes

//4. Save OTP & "Pending Email" to user record
user.otpDetails = {
    otp: otpCode,
    otpExpires: expires,
    pendingEmail: isNewEmail ? targetEmail : null  // Store only if it's different
};

await user.save();

//5. Send to both Phone and New Email provided simultaneously


    await Promise.all([
        //Send SMS (Replace with your SMS gateway like Sparrow SMS or Akash SMS)
        sendSMS (Mobile, `Your OTP code is: ${otpCode}`),

        //Send Email
        sendEmail(targetEmail, {
            subject: "Your Login OTP",
            message: `Your code is ${otpCode}, If you entered a new Email, this will become ytour primary login. If you don't see it, check your Spam/Promotions`
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

