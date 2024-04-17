import express from "express";
import { UserController } from "../../controllers/user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.middleware.js";

export const userRoutes = express.Router();

userRoutes.post("/", UserController.createUser);
userRoutes.get("/", checkAuth, UserController.getAllUsers);
userRoutes.get("/:id", checkAuth, UserController.getUserById);
userRoutes.put("/:id", checkAuth, UserController.updateUser);
userRoutes.delete("/:id", checkAuth, UserController.deleteUser);
userRoutes.post("/confirm-account",  UserController.confirmAccount);
userRoutes.post("/login", UserController.login);
userRoutes.get("/session/session-user", checkAuth, UserController.getUserAuthenticated);

