import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

//handle file uploads
import multer from "multer";

//dealing with file and directory paths
import path from "path";
//create formdata objects
import FormData from "form-data";
import fs from "fs";

//convert audio to mp3
import ffmpeg from "fluent-ffmpeg";

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

router.route("/upload").post(upload.single("file"), async (req, res) => {
  try {
    const inputFile = req.file.path;
    const outputFile = `uploads/file-${new Date().valueOf()}.mp3`;
    console.log(req.file, "req.file");
    const conversionPromise = new Promise((resolve, reject) => {
      console.log("inside conversion promise");
      ffmpeg(inputFile)
        .audioCodec("libmp3lame")
        .format("mp3")
        .on("end", () => {
          resolve();
        })
        .on("error", (err) => {
          console.log("An error occurred: " + err.message);
          reject(err);
        })
        .save(outputFile);
    });

    await conversionPromise.catch((err) => console.log("rejected", err));

    const whisperResult = await getTranscribedAudio(outputFile);
    console.log(whisperResult, "whispperrrrrrrrrrrrrrrr");
    res.status(200).json({ message: "success", data: whisperResult.text });
  } catch (err) {
    res.status(500).send({ message: "Transcription failed", err });
  }
});

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const model = "whisper-1";

async function getTranscribedAudio(filePath) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
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

    const data = await openAIres.json();
    return data;
  } catch (error) {
    console.log(
      error?.response.data.error.message,
      "error from openai whisperer"
    );
    throw error;
  }
}

export default router;
