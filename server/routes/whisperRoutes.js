import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

//handle file uploads
import multer from "multer";

//dealing with file and directory paths
import path from "path";
//create formdata objects
import FormData from "form-data";
import fs from "fs";

//set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${new Date().valueOf()}-${ext}`);
  },
});

//multer middleware
const upload = multer({ storage: storage });

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from whisper routess!" });
});

//audio upload
router.route("/upload").post(upload.single("audio"), async (req, res) => {
  try {
    req.session.filePath = req.file.path;

    res.status(200).send({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "File upload failed", err });
  }
});

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const model = "whisper-1";

//sends the file to whisper to transcribe
router.route("/").post(async (req, res) => {
  try {
    //check if file is uploaded
    if (!req.session.filePath) {
      res.status(400).send({ message: "No file uploaded" });
      return;
    }

    const whisperResult = await getTranscribedAudio(req.session.filePath);

    res.status(200).json({ message: "success", data: whisperResult.text });
  } catch (err) {
    console.log(
      error?.response.data.error.message,
      "open ai ERRORRRRRRRRRRRRRRRRRRRRR"
    );
    res.status(500).send({ message: "Transcription failed", err });
  }
});

async function getTranscribedAudio(filePath) {
  const formData = new FormData();
  formData.append("audio", fs.createReadStream(filePath));
  formData.append("model", model);

  try {
    const openAIres = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
        body: formData,
      }
    );

    console.log(openAIres.data, "res from openai whisperer");
    return openAIres.data;
  } catch (error) {
    console.log(error, "error from openai whisperer");
    throw error;
  }
}

export default router;
