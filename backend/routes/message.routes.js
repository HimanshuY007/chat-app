import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessage } from "../controllers/message.controller.js";

const messageRoutes = express.Router();

messageRoutes.post("/send/:id", protectRoute, sendMessage);
messageRoutes.get("/:id", protectRoute, getMessage);

export default messageRoutes;
