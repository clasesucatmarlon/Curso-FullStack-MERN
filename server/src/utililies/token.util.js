import jwt from 'jsonwebtoken';


/**
 * The function `generateToken` generates a random 6-digit token as a string.
 */
export const generateToken = () =>
    Math.floor(100000 + Math.random() * 900000).toString();


/**
 * The function `generateJWT` generates a JSON Web Token (JWT) with a specified ID and expiration time
 * of 1 day.
 * @param id - The `id` parameter is the unique identifier of the user for whom the JWT token is being
 * generated.
 * @returns A JSON Web Token (JWT) is being returned, which is generated using the `jwt.sign` method
 * from the `jsonwebtoken` library. The JWT contains the `id` payload and is signed using the
 * `JWT_SECRET` stored in the environment variables. It has an expiration time of 1 day.
 */
export const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};