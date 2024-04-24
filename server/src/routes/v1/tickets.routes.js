import express from "express";

import { TicketController } from "../../controllers/tickets.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.middleware.js";

export const ticketsRoutes = express.Router();

ticketsRoutes.post("/", checkAuth, TicketController.createTicket);
