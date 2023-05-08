import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

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

const app = express();

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

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_DB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
