import express from "express";
import * as dotenv from "dotenv";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPinecone } from "../services/pinecone.js";
import { indexName } from "../config.js";
import {
  generateImage,
  getIntentNLP,
  queryMongoWithIntent,
} from "../services/openai.js";

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { chatText, command, userName, email } = req.body;

  if (command === "image") {
    try {
      const image = await generateImage(chatText);
      res.status(200).json({
        text: "",
        image,
        imagePrompt: chatText,
        sender: userName,
        id: Math.floor(Math.random() * 100000),
        time: new Date().toLocaleTimeString(),
        room: "",
      });
    } catch (error) {
      console.log(error, "error dataa");
      res.status(500).json({ text: `Error: ` });
    }

    return;
  } else if (command === "query") {
    try {
      const nlpIntent = await getIntentNLP(chatText);
      const intentObj = JSON.parse(nlpIntent);
      const result = await queryMongoWithIntent({
        ...intentObj,
        loggedInUser: userName,
        loggedInEmail: email,
      });

      return res.status(200).json({
        text: result,
        sender: "AI",
        id: Math.floor(Math.random() * 100000),
        time: new Date().toLocaleTimeString(),
        room: "",
      });
    } catch (error) {
      console.log(error, "error dataa");
      return res
        .status(500)
        .json({ text: `Error: query failed`, sender: "AI" });
    }
  }

  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONEMENT,
    });

    const text = await queryPinecone(chatText);

    res.status(200).json({
      text,
      command,
      chatText, //original msg
      sender: "AI",
      id: Math.floor(Math.random() * 100000),
      time: new Date().toLocaleTimeString(),
      room: "",
    });
  } catch (error) {
    console.log(error.message, "chatbot ERRORRRRRRRRRRRRRRRRRRRRR");

    res.status(500).json({
      text: "Error someone went wrong with Pinecone Query",
      sender: "AI",
      error: error?.message,
    });
  }
});

export default router;
