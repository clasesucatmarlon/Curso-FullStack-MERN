import express from "express";
import { UserController } from "../../controllers/user.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/", UserController.createUser);
