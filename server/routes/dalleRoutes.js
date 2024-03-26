import express from "express";
import * as dotenv from "dotenv";
import { customRateLimiter } from "../middleware/rateLimit.js";
import { generateImage } from "../services/openai.js";

dotenv.config();

const router = express.Router();

router.route("/").post(customRateLimiter(1, 5), async (req, res) => {
  try {
    const { prompt } = req.body;

    const image = await generateImage(prompt);

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
