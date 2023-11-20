import express from "express";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");
  res.send("hello from auth route");
});

router.route("/user").post(async (req, res) => {
  console.log("POST request received");
  const { username, email } = req.body;
  console.log(email, "email");
  console.log(username, "username");

  const user = await User.findOne({ email });
  console.log(user, "user");

  if (user) {
    res.send("user exists");
  } else {
    res.send("new user");
  }
});

export default router;
