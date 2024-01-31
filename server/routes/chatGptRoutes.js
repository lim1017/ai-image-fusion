import express from "express";
import * as dotenv from "dotenv";
import { openai } from "../apis/openai.js";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from chatGPT routess!" });
});

//handles array of words + prompt engineering to generate image prompt
router.route("/").post(async (req, res) => {
  try {
    const { chips } = req.body;

    const words = chips.join();

    //Completions API legacy
    const gptRes = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: `
      Perform the following action:
      Use the list of words delimited by triple asterisk. 
      Generate a sentence containing all of these words that describes an image.  
      Take into consideration the following restrictions: The sentence should not start with things, such as "an image of" or "this image".

      words: ***${words}***`,
      temperature: 0.9,
      max_tokens: 60,
      n: 1,
    });

    const prompt = gptRes.data.choices[0].text;

    res.status(200).json(prompt);
  } catch (error) {
    console.log(error.message, "open ai ERRORRRRRRRRRRRRRRRRRRRRR");
    console.log(error?.response.data.error.message, "msg error");
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
