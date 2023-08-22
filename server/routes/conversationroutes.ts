import express from "express";
import {
  getConversation,
  saveConversation,
} from "../controllers/conversationcontroller";
import { isAuth } from "../middlewares/auth";

const conversationRouter = express.Router();

conversationRouter.post("/conversation", isAuth, saveConversation);
conversationRouter.get("/", isAuth, getConversation);

export default conversationRouter;
