import express from "express";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

dotenv.config();

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");
  const user = req.user;
  console.log(user, "USER!!!!!!!!!");
  res.send({ user });
});

// //need this for post route?
// https://community.auth0.com/t/cant-make-post-request/57815
//  const checkJwt = auth({
//   audience: "ai-server",
//   issuerBaseURL: `https://ai-images2.us.auth0.com/`,
// });

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
