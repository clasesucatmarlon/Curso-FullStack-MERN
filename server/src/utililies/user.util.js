import bcrypt from 'bcrypt';

/**
 * The hashPassword function uses bcrypt to generate a salt and hash the input password asynchronously.
 * @param password - The `hashPassword` function takes a password as input and generates a hashed
 * version of the password using bcrypt with a randomly generated salt.
 * @returns The `hashPassword` function is returning a hashed version of the input `password` after
 * generating a salt using `bcrypt.genSalt(10)` and hashing the password with the generated salt using
 * `bcrypt.hash(password, salt)`.
 */
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};


/**
 * The function `checkPassword` uses bcrypt to compare an entered password with a stored hash
 * asynchronously.
 * @param enteredPassword - The `enteredPassword` parameter is the password that a user enters when
 * trying to log in.
 * @param storedHash - The `storedHash` parameter typically refers to the hashed version of the
 * password that is stored in a database or any other storage mechanism. When a user tries to log in,
 * their entered password is hashed and compared with this stored hash to verify the password's
 * correctness without storing the actual password in plain text
 * @returns The function `checkPassword` is returning a promise that resolves to a boolean value
 * indicating whether the entered password matches the stored hash after comparing them using bcrypt's
 * `compare` method.
 */
export const checkPassword = async (enteredPassword, storedHash) => {
    return await bcrypt.compare(enteredPassword, storedHash);
};