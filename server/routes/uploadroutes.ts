import express from 'express';
import { isAuth } from '../middlewares/auth';
import { uploadAudio } from '../controllers/uploadcontroller';
import fileUpload from '../middlewares/file-upload';


const uploadRouter = express.Router();

uploadRouter.post('/upload',isAuth,fileUpload,uploadAudio);

export default uploadRouter;