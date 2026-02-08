import { User } from './Models/User.js';
import { matchPassword, generateToken } from '../Utils/authUtils.js'; // Assuming these exist

export const loginUser = async (req, res) => {
    const { Mobile, Email, Password, otp } = req.body;

    try {
        // 1. Find the user by Mobile
        const user = await User.findOne({ Mobile });
        if (!user) return res.status(404).json({ message: "Mobile number not found." });

        // --- BRANCH A: STAFF (Password Login) ---
        const staffRoles = ['Super User', 'Designer', 'Accountant', 'Manager', 'Inventory', 'Sales', 'Delivery' ]

        if (staffRoles.includes(user.Role)) {
            // If the staff member hasn't sent a password yet, tell frontend to show password field
            //1. First Time Login (SETUP)
            if (!user.Password) {
                return res.status(200).json({
                    role: user.Role,
                    needsPassword: true,
                    message: "Welcome to the team! Please set your permanent password."});
            }
            // 2. RETURNING STAFF (Login)
                // Check if they actually provided a password in the request
                if (!Password) {
                    return res.status(200).json({ role: user.Role, needsPassword: true });
                }

            // 3. Verify Password
            const isMatch = await matchPassword(Password, user.Password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid Staff credentials." });
            }
            // 4. Success
            return res.status(200).json({
                token: generateToken(user._id),
                role: user.Role,
                userName: user.UserName
            });
        } else {
           
            // --- BRANCH B: CUSTOMER (Background Checks & OTP Login) ---
            
            // STEP 1: Background Check - User entered Mobile but no Email/OTP yet
            if (!Email && !otp) {
                return res.status(200).json({ 
                    role: 'Customer', 
                    needsEmail: true, 
                    message: "Please enter your email to proceed." 
                });
            }

            // STEP 2: Background Check - User entered Email, check if it matches
            if (Email && !otp) {
                const emailMatches = user.Email === Email.toLowerCase();
                return res.status(200).json({
                    role: 'Customer',
                    emailMatches: emailMatches, // true if same, false if different
                    isNewEmail: !emailMatches,  // This is the "Condition" for your frontend
                    message: emailMatches 
                        ? "Email verified. Click 'Send OTP' to continue." 
                        : "Email mismatch. Is this your new email? Click 'Send OTP' to update."
                });
            }

            // STEP 3: Final Login - User submitted the OTP
            if (otp) {
                const isValidOtp = user.otpDetails.otp === otp && user.otpDetails.otpExpires > Date.now();
                
                if (!isValidOtp) {
                    return res.status(401).json({ message: "Invalid or expired OTP." });
                }

                // Handle Email Swap if sendOTP saved a pendingEmail
                if (user.otpDetails.pendingEmail && user.Email !== user.otpDetails.pendingEmail) {
                    if (!user.EmailHistory.includes(user.Email)) {
                        user.EmailHistory.push(user.Email);
                    }
                    user.Email = user.otpDetails.pendingEmail;
                }

                // Cleanup and Save
                user.otpDetails.otp = null;
                user.otpDetails.pendingEmail = null;
                await user.save();

                return res.status(200).json({
                    token: generateToken(user._id),
                    role: user.Role,
                    message: "Login successful!"
                });
            }
        }
        return res.status(400).json({ message: "Incomplete request." });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};