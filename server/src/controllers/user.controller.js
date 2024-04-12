import User from "../models/user.model.js";

export class UserController {

    // CREAR USUARIO
    static createUser = async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        try {
            const user = new User({ firstName, lastName, email, password })
            await user.save();  // Guardar en DB
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
