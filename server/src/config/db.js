import mongoose from 'mongoose';
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Se establexido conexión con la Base de Datos!!!');
    } catch (error) {
        console.log(error);
        console.log(`Error de conexión con la base de datos - ${error}`);
        exit(1);
    }
};