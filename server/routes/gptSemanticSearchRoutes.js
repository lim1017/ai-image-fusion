import express from "express";
import * as dotenv from "dotenv";
import { openai } from "../apis/openai.js";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPinecone } from "../utils.js";
import { indexName } from "../config.js";

import { createPineconeIndex, updatePinecone } from "../utils.js";

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { query } = req.body;
  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONEMENT,
    });

    const text = await queryPinecone(pineconeClient, indexName, query);

    res.status(200).json(text);
  } catch (error) {
    console.log(error.message, "chatbot ERRORRRRRRRRRRRRRRRRRRRRR");
    console.log(error?.response.data.error.message, "msg error");

    res.status(500).json({ success: false, message: err });
  }
});

export default router;
