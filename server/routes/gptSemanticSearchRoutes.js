import express from "express";
import * as dotenv from "dotenv";
import { openai } from "../apis/openai.js";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPinecone } from "../utils.js";
import { indexName } from "../config.js";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

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
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: false, message: err });
  }
});

router.route("/setup").post(async (req, res) => {
  const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
  });

  try {
    const docs = await loader.load();
    const vectorDimensions = 1536;

    const client = new PineconeClient();
    console.log("in setup routee");
    await client.init({
      apiKey: process.env.PINECONE_API_KEY || "",
      environment: process.env.PINECONE_ENVIRONEMENT || "",
    });

    await createPineconeIndex(client, indexName, vectorDimensions);
    await updatePinecone(client, indexName, docs);
    res.status(200).json({
      success: true,
      data: "successfully created index and loaded data into pinecone...",
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({
      success: false,
      data: err,
    });
  }
});

export default router;
