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

    const words = chips.join();

    const gptRes = await openai.createCompletion({
      model: "text-curie-001",
      prompt: `
      Perform the following action:
      Use the list of words delimited by triple asterisk. 
      Generate a sentence containing all of these words that describe an image.  
      
      restrictions: The sentence should not start with things, such as "an image of" or "this image".

      words: ***${words}***`,
      temperature: 0.9,
      max_tokens: 60,
      n: 1,
    });

    const prompt = gptRes.data.choices[0].text;

    res.status(200).json(prompt);
  } catch (error) {
    console.log(error, "open ai ERRORRRRRRRRRRRRRRRRRRRRR");
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
