import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
// import { config } from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import http from "http";
import { IError } from "./types/IError";
import authRouter from "./routes/authroutes";
import conversationRouter from "./routes/conversationroutes";
import userinfoRouter from "./routes/userinforoutes";

import multer from "multer";
import * as fs from "fs";
import * as path from "path";

const app = express();
// config();
require("dotenv").config();

const port = process.env.PORT || 5000;
const mongoURL =process.env.MONGODB_URL;

app.use(cors());

app.use(express.json());

app.use(express.static("media"));

app.use(morgan("short"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle audio data
app.post("/audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const tempFilePath = path.join(__dirname, "audio_files", "audio.wav");
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const audioFile=fs.createReadStream(tempFilePath)
    const data = new FormData();
    //@ts-ignore
    data.append('file',audioFile);
    data.append('model', 'whisper-1'); // Updated the model version

    const resp = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: data,
    });

    if (resp.ok) {
      const transcription = await resp.json();
      console.log(transcription);
      return res.status(200).json(transcription);
    } else {
      const errorResponse = await resp.text();
      console.log("Error:", errorResponse);
      return res.status(500).json({ error: "Transcription failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post("/process",async (req, res)=>{
  
})





app.use(
  (error: IError, req: Request, res: Response, next: NextFunction): void => {
    console.error(error.message);
    if (error.name === "ValidationError") {
      error.text = error.message;
      error.code = 400;
    }
    const statusCode =
      typeof error.code === "number" && error.code >= 100 && error.code <= 599
        ? error.code
        : 500;
    res.status(statusCode).json({
      message: error.text || "Internal server error",
    });
  }
);

app.use("/auth", authRouter);

app.use("/api", conversationRouter);

app.use("/user", userinfoRouter);

const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  mongoose
  //@ts-ignore
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to mongo db");
    })
    .catch((err: Error) => console.log("Couldn't connect to mongodb :" + err));
});
