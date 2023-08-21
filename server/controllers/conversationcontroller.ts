import {RequestHandler } from 'express';
import axios from 'axios';
import ConversationModel from '../models/ConversationSchema';
import { IRequest } from '../types/IRequest';

const PALM_KEY = process.env.PALM_API_KEY;

const apiUrl = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText";
const headers = {
  'Content-Type': 'application/json',
  'x-goog-api-key': PALM_KEY
};

async function generateResponse(prompt: string){
    const data = {
      prompt:prompt,
      temperature: 0,
      maxOutputTokens: 100
    };
    
    const response = await axios.post(apiUrl, data, { headers });
    return response.data; 

}

export const saveConversation:RequestHandler=async(req: IRequest, res,next) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id;
    
    const response = await generateResponse(prompt);
    
    const conversation = new ConversationModel({
      userId,
      prompt,
      response,
    });
    
    await conversation.save();
    console.log(response)
    res.status(201).json({ message: 'Conversation saved successfully' });
  } catch (error) {
      next(error);
  }
}


export const getConversation: RequestHandler = async (req: IRequest, res, next)=> {
  try {
    const userId = req.user?.id;
    
    const conversationData = await ConversationModel.find({ userId }); 
    
    console.log(conversationData);
    
    res.status(200).json({ message: 'Conversation data retrieved successfully', data: conversationData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

