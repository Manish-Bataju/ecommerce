import nodemailer from 'nodemailer';

export const sendEmail = async(to, {subject, message})=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    return transporter.sendMail({
        from: `"App Name" <${process.env.EMAIL_USER}>`,
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
