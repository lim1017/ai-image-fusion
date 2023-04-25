import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err, "error connecting to db");
  }
};

startServer();
