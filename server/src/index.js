import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { corsConfig } from "./config/cors.config.js";
import cors from "cors";

import {userRoutes} from "./routes/v1/user.routes.js";
import { ticketsRoutes } from "./routes/v1/tickets.routes.js";

dotenv.config();

const app = express();

// BASE DE DATOS
connectDB();

// CONFIGURACION CORS
app.use(cors(corsConfig));

// JSON
app.use(express.json());

// ENDPOINTS
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tickets", ticketsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
