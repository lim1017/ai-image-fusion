//incomeplete
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
  res.status(200).json({ message: "Hello from whisper routess!" });
});

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const model = "whisper-1";

router.route("/").post(async (req, res) => {
  const formData = new FormData();
  formData.append("audio", req.body.audio);
  formData.append("model", model);

  try {
    const openAIres = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
    );

    console.log(openAIres, "res from openai whisperer");

    res.status(200).json("success");
  } catch (error) {
    console.log(
      error?.response.data.error.message,
      "open ai ERRORRRRRRRRRRRRRRRRRRRRR"
    );
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
