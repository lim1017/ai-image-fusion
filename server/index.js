import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

//parse incoming requests
import bodyParser from "body-parser";
//managing user sessions
import session from "express-session";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import twilioRoutes from "./routes/twilioRoutes.js";
import chatGptRoutes from "./routes/chatGptRoutes.js";
import whisperRoutes from "./routes/whisperRoutes.js";
import gptSemanticSearchRoutes from "./routes/gptSemanticSearchRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { loadTrainingData } from "./services/pinecone.js";
import { initSocketIO } from "./socketIO.js";

const app = express();
const server = createServer(app);

initSocketIO(server);

//serves static files from public folder
app.use(express.static("public"));

//parses incoming req bodies
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// //use express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

dotenv.config();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/twilio", twilioRoutes);
app.use("/api/v1/gpt", chatGptRoutes);
app.use("/api/v1/whisper", whisperRoutes);
app.use("/api/v1/gptSearch", gptSemanticSearchRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_DB_URL);
    server.listen(port, () =>
      console.log(`Server started on port ${port}, in development mode`)
    );
  } catch (error) {
    console.log(error);
  }

  try {
    await loadTrainingData();
  } catch (err) {
    console.log("error: ", err);
  }
};

startServer();
