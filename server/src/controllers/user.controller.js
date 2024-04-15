import { generateToken } from "../utililies/token.util.js";
import { hashPassword } from "../utililies/user.util.js";
import { validateEmail } from "../validators/email.validator.js";
import { Types } from 'mongoose';
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

    // BUSCAR TODOS LOS USUARIOS
    static getAllUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ response: 'error', message: 'Error del servidor' });
        }
    };

    // BUSCAR USUARIO POR ID
    static getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!Types.ObjectId.isValid(id)) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'ID no válido' });
            }
            const user = await User.findById(id);
            // const user = await User.findById(id).select("firstName lastName"); // traer sólo estas propiedades
            // const user = await User.findById(id).select("-password -image"); // traer todo menos password e image
            if (!user) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ response: 'error', message: 'Error del servidor' });
        }
    };

    // ACTUALIZAR USUARIO
    static updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName } = req.body;

            if (!Types.ObjectId.isValid(id)) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'ID no válido' });
            }

            const user = await User.findById(id);
            if (!user) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'Usuario no encontrado' });
            }

            // REEMPLAZAR PROPIEDAD CON NUEVO VALOR O DEJAR EL VALOR ANTIGUO
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;

            //TODO: Validar email al actualizar
            //TODO: Validar que el email no exista
            //TODO: Validar password

            // GUARDAR USUARIO EN BD
            await user.save();
            res
                .status(200)
                .json({ response: 'success', message: 'Usuario actualizado' });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ response: 'error', message: 'Error del servidor' });
        }
    };

    // ELIMINAR USUARIO
    static deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            if (!Types.ObjectId.isValid(id)) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'ID no válido' });
            }

            const user = await User.findById(id);
            if (!user) {
                return res
                    .status(404)
                    .json({ response: 'error', message: 'Usuario no encontrado' });
            }
            await user.deleteOne();
            res
                .status(200)
                .json({ response: 'success', message: 'Usuario eliminado' });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ response: 'error', message: 'Error del servidor' });
        }
    };

}
