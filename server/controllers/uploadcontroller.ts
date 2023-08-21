import { Request, RequestHandler, Response } from 'express';
// import fs from 'fs';
// import { convertAudioToText } from '../middlewares/Audiototext';
import { IError } from '../types/IError';

export const uploadAudio:RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
    //   return res.status(400).json({ error: 'No audio file uploaded' });
      throw new IError('No audio file uploaded', 400);
      
    }

    // const audioFilePath = req.file.path;

    // Convert the audio file to text
    // const transcript = await convertAudioToText(audioFilePath); 

    // Process the transcript and generate a response
    // const response = 'You said: ' + transcript;

    // res.json({ response });
  } catch (error) {
    console.error('Error uploading audio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
