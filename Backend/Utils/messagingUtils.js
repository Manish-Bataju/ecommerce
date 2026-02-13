import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async(to, {subject, message})=>{
    // DEBUG: This will show in your console if the .env variables are loading
     console.log("Using Email:", process.env.EMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        return transporter.sendMail({
        from: `"Pukucha" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text: message,
        html: `<p>${message}</p>`
    });
};

export const sendSMS = async(mobile, message)=>{
    //integration for Sparrow SMS or Akash SMS goes here
    console.log(`SMS to ${mobile}: ${message}`);
    return Promise.resolve();
};
