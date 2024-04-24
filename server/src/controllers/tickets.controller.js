import Ticket from "../models/tickets.model.js";
import User from "../models/user.model.js";

export class TicketController {

    // CREAR TICKET
    static createTicket = async (req, res) => {
        try {
            const { user } = req;

            const { title, shortDescription, description, category } = req.body;

            if (!title || !shortDescription || !description || !category) {
                return res.status(400).json({
                    response: "error",
                    message: "Todos los datos son obligatorios",
                });
            }

            const ticket = new Ticket({
                title,
                shortDescription,
                description,
                category,
                createdBy: user._id,
            });

            const savedTicket = await ticket.save();

            // TICKET CON LOS DATOS DEL USUARIO CREADOR
            const ticketWithCreatedBy = await Ticket.findById(
                savedTicket._id
            ).populate({
                path: "createdBy",
                model: "User",
                select: "-password -__v -updatedAt -isActive -isConfirmed",
            });

            // LISTA DE USUARIOS QUE TIENEN PERMISO DE SUPPORT PARA LUEGO ENVIARLES EMAIL CON NUEVO TICKET CREADO
            const usersSupport = await User.find({ permissions: { $in: "support" } });

            // TODO: ENVIAR EMAIL A LOS USUARIOS DE SUPPORT

            res
                .status(202)
                .json({ response: "success", message: "Ticket creado correctamente", ticket });

            // res.send({ message: "Ticket... ", Ticket: usersSupport })

            usersSupport



        } catch (error) {
            console.log("[ERROR_CREATE_TICKET]", error);
            return res
                .status(500)
                .json({ response: "error", message: "Error del servidor" });
        }
    }
}