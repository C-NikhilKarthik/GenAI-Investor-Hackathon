import { RequestHandler } from "express";
import { TextServiceClient } from "@google-ai/generativelanguage/build/src/v1beta2/text_service_client";
import { GoogleAuth } from "google-auth-library";
import ConversationModel from "../models/ConversationSchema";
import { IRequest } from "../types/IRequest";

// Load environment variables from .env file
require("dotenv").config();

const MODEL_NAME = "models/text-bison-001";
const PALM_KEY = process.env.PALM_API_KEY;

// Create an instance of GoogleAuth
const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(PALM_KEY || ""),
});

async function generateResponse(prompt: string): Promise<string> {
  console.log(PALM_KEY); // Debugging statement

  const input = prompt;

  const result = await client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: input,
    },
  });

  return JSON.stringify(result);
}

// Rest of your code...

export const saveConversation: RequestHandler = async (
  req: IRequest,
  res,
  next
) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id;

    const response = await generateResponse(prompt);
    const parsedResponse = JSON.parse(response);
    const output = parsedResponse[0].candidates[0].output;
    console.log(output);

    const conversation = new ConversationModel({
      userId,
      prompt,
      response: output,
    });

    await conversation.save();

    res.status(201).json({ output });

    // res.status(201).json({ message: 'Conversation saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const getConversation: RequestHandler = async (
  req: IRequest,
  res,
  next
) => {
  try {
    const userId = req.user?.id;

    const conversationData = await ConversationModel.find({ userId });

    console.log(conversationData);

    res.status(200).json({
      message: "Conversation data retrieved successfully",
      data: conversationData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
