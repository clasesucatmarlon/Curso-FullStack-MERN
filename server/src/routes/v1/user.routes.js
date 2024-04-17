import express from "express";
import { UserController } from "../../controllers/user.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/", UserController.createUser);
userRoutes.get("/", UserController.getAllUsers);
userRoutes.get("/:id", UserController.getUserById);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.post("/confirm-account", UserController.confirmAccount);

