import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E routess!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiRes = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = aiRes.data.data[0].b64_json;
    // for response_format = 'url'
    // const image = aiRes.data;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(
      error?.response.data.error.message,
      "open ai ERRORRRRRRRRRRRRRRRRRRRRR"
    );
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
