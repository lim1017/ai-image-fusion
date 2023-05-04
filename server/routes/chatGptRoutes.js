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

router.route("/initial").get(async (req, res) => {
  try {
    const gptRes = await openai.createCompletion({
      // model: "gpt-3.5-turbo",
      model: "text-davinci-003",
      prompt:
        "Here is your job, I will give you an array of words. you will take that array and construct a short description, not longer then 5x the length of the array. For example array: [cow, dragon, warrior], result: a cow warrior with big horns facing off against a dragon. Do you understand",
      temperature: 0.8,
      n: 1,
    });

    res.status(200).json("success");
  } catch (error) {
    console.log(
      error?.response.data.error.message,
      "open ai ERRORRRRRRRRRRRRRRRRRRRRR"
    );
    res.status(500).send(error?.response.data.error.message);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { chips } = req.body;

    const gptRes = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Here is your job, I will give you an array of words. you will take that array and build a sentence describing an image.   Words in the sentence should be equal to about 5x the length of the array, use complete sentences. For example input=[cow, dragon, warrior], result="a cow warrior with big horns facing off against a dragon.".  
      array: ${JSON.stringify(chips)}`,
      temperature: 0.9,
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
