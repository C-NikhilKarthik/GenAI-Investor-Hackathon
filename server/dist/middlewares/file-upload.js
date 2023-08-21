"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const IError_1 = require("../types/IError");
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    filename: (req, file, callback) => {
        const fileName = Date.now() + path_1.default.extname(file.originalname);
        callback(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const fileUpload = (req, res, next) => {
    fs_1.default.mkdir('media', { recursive: true }, () => { });
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            next(new IError_1.IError('Multer file Upload file error', 500));
        }
        else if (err) {
            next(err);
        }
        else {
            next();
        }
    });
};
exports.fileUpload = fileUpload;
exports.default = exports.fileUpload;
//# sourceMappingURL=file-upload.js.map