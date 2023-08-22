"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversation = exports.saveConversation = void 0;
const text_service_client_1 = require("@google-ai/generativelanguage/build/src/v1beta2/text_service_client");
const google_auth_library_1 = require("google-auth-library");
const ConversationSchema_1 = __importDefault(require("../models/ConversationSchema"));
require("dotenv").config();
const MODEL_NAME = "models/text-bison-001";
const PALM_KEY = process.env.PALM_API_KEY;
const client = new text_service_client_1.TextServiceClient({
    authClient: new google_auth_library_1.GoogleAuth().fromAPIKey(PALM_KEY || ""),
});
function generateResponse(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(PALM_KEY);
        const input = prompt;
        const result = yield client.generateText({
            model: MODEL_NAME,
            prompt: {
                text: input,
            },
        });
        return JSON.stringify(result);
    });
}
const saveConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { prompt } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const response = yield generateResponse(prompt);
        const parsedResponse = JSON.parse(response);
        const output = parsedResponse[0].candidates[0].output;
        console.log(output);
        const conversation = new ConversationSchema_1.default({
            userId,
            prompt,
            response: output,
        });
        yield conversation.save();
        res.status(201).json({ output });
    }
    catch (error) {
        next(error);
    }
});
exports.saveConversation = saveConversation;
const getConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const conversationData = yield ConversationSchema_1.default.find({ userId });
        console.log(conversationData);
        res.status(200).json({
            message: "Conversation data retrieved successfully",
            data: conversationData,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.getConversation = getConversation;
//# sourceMappingURL=conversationcontroller.js.map