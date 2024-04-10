import express from "express";
import * as dotenv from "dotenv";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPinecone } from "../services/pinecone.js";
import { indexName } from "../config.js";
import { generateImage } from "../services/openai.js";

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { chatText, command } = req.body;

  if (command === "image") {
    console.log(chatText, "chatText");
    console.log({ command, chatText });
    try {
      const image = await generateImage(chatText);
      res.status(200).json({ text: "", image, imagePrompt: chatText });
    } catch (error) {
      console.log(error, "error dataa");
      res.status(500).json({ text: `Error: ` });
    }

    return;
  }

  // else if (command === "gpt") {
  //   io.in("chat1").emit("chat_response", data);
  //   const response = await queryPinecone(text);
  //   io.in("chat1").emit("chat_response", {
  //     ...data,
  //     text: "",
  //     gpt: response,
  //   });
  // } else if (command === "query") {
  //   io.in("chat1").emit("chat_response", data);
  //   const nlpIntent = await getIntentNLP(text);
  //   const intentObj = JSON.parse(nlpIntent);
  //   const result = await queryMongoWithIntent({
  //     ...intentObj,
  //     loggedInUser: sender,
  //     loggedInEmail: email,
  //   });
  //   io.in("chat1").emit("chat_response", {
  //     ...data,
  //     text: "",
  //     gpt: result,
  //   });
  // }

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
      chatText,
      sender: "ai",
      id: Math.floor(Math.random() * 100000),
      time: new Date().toLocaleTimeString(),
      room: "",
    });
  } catch (error) {
    console.log(error.message, "chatbot ERRORRRRRRRRRRRRRRRRRRRRR");
    console.log(error?.response.data.error.message, "msg error");

    res.status(500).json({ success: false, message: err });
  }
});

export default router;
