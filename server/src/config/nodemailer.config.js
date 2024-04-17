import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = () => {
    return {
        host: process.env.HOST_EMAIL,
        port:  Number(process.env.PORT_EMAIL),
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    }
};

export const transporter = nodemailer.createTransport(config());