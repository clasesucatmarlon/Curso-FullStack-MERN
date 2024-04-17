import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


/**
 * The function `checkAuth` verifies the existence and validity of a Bearer token in the request
 * headers and retrieves user data without the password if the token is valid.
 * @param req - The `req` parameter in the `checkAuth` function stands for the request object. It
 * contains information about the HTTP request that is being made, such as the headers, body,
 * parameters, and query strings. In this context, `req` is used to access the headers of the incoming
 * request
 * @param res - The `res` parameter in the `checkAuth` function is the response object that will be
 * sent back to the client making the request. It is used to send the HTTP response back to the client
 * with the appropriate status code and message in case of success or error.
 * @param next - The `next` parameter in the `checkAuth` function is a callback function that is used
 * to pass control to the next middleware function in the request-response cycle. When called, it
 * passes the control to the next middleware function. If there are no more middleware functions in the
 * stack, it passes control
 * @returns The `checkAuth` function returns either a call to the `next()` function if the token is
 * valid and the user data is successfully retrieved, or it returns a response with a status code of
 * 401 and a JSON object containing an error message if the token is missing, invalid, or the user data
 * retrieval fails.
 */
export const checkAuth = async (req, res, next) => {
    let token;

    // VERIFICAR QUE EL TOKEN EXISTA Y QUE COMIENCE POR BEARER
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // VERIFICAR QUE SEA UN TOKEN VÁLIDO
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // GENERAR Y ENVIAR A REQ LA PROPIEDAD USER CON LA DATA DEL USUARIO SIN EL PASSWORD
            req.user = await User.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            return res
                .status(401)
                .json({ response: 'error', message: 'Sin autorizaciön' });
        }
    }

    if (!token) {
        return res
            .status(401)
            .json({ response: 'error', message: 'Token no válido' });
    }

    return next();
};