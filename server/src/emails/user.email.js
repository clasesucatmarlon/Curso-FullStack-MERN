import { transporter } from "../config/nodemailer.config.js";

export class UserEmail {

    // CONFIRMAR CUENTA
    static confirmAccount = async ({ firstName, lastName, email, token }) => {
        try {
            await transporter.sendMail({
                from: 'MAGM CODE <noreply@mern.com>',
                to: email,
                subject: 'Confirmar cuenta',
                text: 'Confirmar cuenta',
                html: `<div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 1rem; font-family: sans-serif;">
            <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;">Bienvenido a MAGM CODE</h1>
            <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Hola <span style="font-weight: bold;">${firstName} ${lastName}</span>, gracias por registrarte en MAGM CODE, para confirmar tu cuenta, por favor ingresa al enlace <a href="${process.env.CLIENT_URL}/auth/confirm-account" style="text-decoration: none; color: #000; font-weight: bold;">confirmar cuenta</a> y escribe el siguiente código de confirmación:</p>
            <h2 style="text-align: center; color: blue; font-size: 2rem; font-weight: 700;">${token}</h2>  
            <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Si no has sido tú quien se ha registrado en MAGM CODE, por favor ignora este correo.</p>
            <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Saludos, MAGM CODE.</p>
        </div>`,
            });
        } catch (error) {
            console.log(`[ERROR_EMAIL_CONFIRM_ACCOUNT]: ${error}`);
        }
    };

}