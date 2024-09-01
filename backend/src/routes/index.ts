
import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const approuter = Router();

approuter.use("/user", userRoutes);
approuter.use("/chats", chatRoutes);

export default approuter;
