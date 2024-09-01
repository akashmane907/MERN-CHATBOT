import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';

export const generateChatCompletion = async (
    req: Request, res: Response, next: NextFunction
) => {
    const { message } = req.body;

    

    try {
        // Ensure that 'jwtData' is correctly accessed
        const user = await User.findById(res.locals.jwtData.id) ;
        
        if (!user) {
            return res.status(401).json({ message: 'User not registerd or token missing' });
        }

      
      
        // Process user chats
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: 'user' });

        user.chats.push({ content: message, role: 'user' });

        // Configure OpenAI
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);

        // Request chat completion from OpenAI
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });

        // Update user chats with the response from OpenAI
        user.chats.push(chatResponse.data.choices[0].message);

        // Save updated user
        await user.save();

        // Respond with updated chats
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error('Error in generateChatCompletion:', error);
    
        // Additional logging
        if (error.response) {
            console.error('Error details:', error.response.status, error.response.data);
        }
    
        return res.status(500).json({ message: 'Something went wrong', cause: error.message });
    }
     
};
