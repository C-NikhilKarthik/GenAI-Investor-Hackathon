import multer from 'multer';
import path from 'path';
import { IRequest } from '../types/IRequest';
import { IError } from '../types/IError';
import fs from 'fs';
import { RequestHandler } from 'express';

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
	// 	if (file.mimetype === 'application/pdf') {
	// 		return cb(new IError('PDF files are not allowed', 400), '');
	// 	}
	// 	cb(null, `${baseDir}/media`);
	// },
  
  filename: (req:IRequest, file:any, callback:any) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

const upload = multer({ storage: storage });


export const fileUpload: RequestHandler = (req, res, next) => {
	fs.mkdir('media', { recursive: true }, () => {});
	upload.single('file')(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			next(new IError('Multer file Upload file error', 500));
		} else if (err) {
			next(err);
		} else {
			next();
		}
	});
};

export default fileUpload;