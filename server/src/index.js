import express from "express";
import dotenv from "dotenv";

import {userRoutes} from "./routes/v1/user.routes.js"

dotenv.config();

const app = express();

// JSON
app.use(express.json());

// ENDPOINTS
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});