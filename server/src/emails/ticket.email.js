import { transporter } from "../config/nodemailer.config.js";

export class TicketEmail {

    // PLANTILLA PARA EMAIL: CREADO TICKET
    static createTicket = async ({ ticketId, firstName, lastName, email, description }) => {
        try {
            await transporter.sendMail({
                from: "MAGM CODE <noreply@mern.com>",
                to: email,
                subject: "Nuevo ticket creado",
                text: "Nuevo ticket creado",
                html: `<div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 1rem; font-family: sans-serif;">
        <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;">Nuevo ticket</h1>
        <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Hay nuevo ticket creado por <span style="font-weight: bold;">${firstName} ${lastName}</span>. Para más información: <a href="${process.env.CLIENT_URL}/tickets/${ticketId}" style="text-decoration: none; color: #000; font-weight: bold;">click aquí</a>.</p>
        <div style="max-width: 100%; padding: 16px;">
        ${description}
        </div> 
        <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Saludos, MAGM CODE.</p>
    </div>`,
            });
        } catch (error) {
            console.log(`[ERROR_EMAIL_CREATE_TICKET]: ${error}`);
        }
    };
}