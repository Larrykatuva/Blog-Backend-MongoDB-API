import  nodemailer from "nodemailer";
import dotenv from 'dotenv';

export class EmailUtil{

    static async sendActivationMail(receipientEmail, code){
        try {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: process.env.EMAIL_ADDRESS,
                to: receipientEmail,
                subject: "Account activation",
                text: "please use the given link to activate your account",
                html: `
                    <div style='background-color:#f7f7f7; padding:70px; font-family:Arial, Helvetica; font-size:12px;'>
                        <div style='box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px; background-color:#ffffff; padding:70px;'>
                            <p>You've specified that you didn't have much experience in trading. To help you have a good start with us, we have prepared a series of 10 short letters.</p>
                            <p><strong>Get Started By Activating your Account</strong><br>Click the link bellow to activate your account.</p>
                            <p>${code}</p>
                        </div> 
                </div>`
            });
            return info ? true : false
        } catch (error) {
            return false
        }
    }
}