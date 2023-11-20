import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");
  res.send("hello from auth route");
});

export default router;
