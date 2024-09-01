import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";

const chatRoutes = Router();

// Define the POST route correctly
chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);

export default chatRoutes;
