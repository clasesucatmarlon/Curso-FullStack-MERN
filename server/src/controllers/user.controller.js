import { generateToken } from "../utililies/token.util.js";
import { hashPassword } from "../utililies/user.util.js";
import { validateEmail } from "../validators/email.validator.js";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";

export class UserController {

    // CREAR USUARIO
    static createUser = async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            // VALIDACIONES
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    response: 'error',
                    message: 'Todos los datos son obligatorios',
                });
            }
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res
                    .status(409)
                    .json({ response: 'error', message: 'El usuario ya existe' });
            }
            if (!validateEmail(email)) {
                return res
                    .status(409)
                    .json({ response: 'error', message: 'Email no válido' });
            }
            if (password.length < 6) {
                return res.status(409).json({
                    response: 'error',
                    message: 'El password debe contener al menos 6 caracteres',
                });
            }

            // HASHEAR PASSWORD ANDES DE GUARDARLO EN LA BD
            const hashedPassword = await hashPassword(password);

            // CREAR ESTRUCTURA CON DATA RECIBIDA POR EL BODY
            const user = new User({ firstName, lastName, email, password: hashedPassword })

            // GENERAR TOKEN DE 6 DIGITOS PARA CONFIRMAR CUENTA
            const token = new Token({
                token: generateToken(),
                user: user._id,
            });

            // GUARDAR USUARIO y TOKEN EN BD
            await Promise.allSettled([user.save(), token.save()]);

            // TODO: REGISTRARSE Y MANDAR EMAIL PARA CONFIRMAR REGISTRO 

            // RESPUESTA LUEGO DE GUARDAD EN BD DE MANERA CORRECTA
            res.status(202).json({
                response: 'success',
                message: 'Usuario creado',
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res
                .status(500)
                .json({ response: 'error', message: 'Error del servidor' });
        }
    }

}
