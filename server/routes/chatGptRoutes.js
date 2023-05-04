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
  res.status(200).json({ message: "Hello from chatGPT routess!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { chips } = req.body;

    const gptRes = await openai.createCompletion({
      model: "text-curie-001",
      prompt: `I will give you an array of words. use all the words in the array to build a sentence describing an image.  Number of words in the sentence should be less then 5x the length of the array.   
      array= ${JSON.stringify(chips)}`,
      temperature: 0.9,
      max_tokens: 60,
      n: 1,
    });

    const prompt = gptRes.data.choices[0].text;

    res.status(200).json(prompt);
  } catch (error) {
    console.log(
      error?.response.data.error.message,
      "open ai ERRORRRRRRRRRRRRRRRRRRRRR"
    );
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
