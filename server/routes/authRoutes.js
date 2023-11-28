import express from "express";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import UserSchema from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");
  const user = req.user.data;
  const token = req.token;
  console.log(user, "USER!!!!!!!!!");
  try {
    const isUser = await UserSchema.find().where("email", user.email);

    if (isUser) {
      console.log("user already Exists!!!");
      res.send(201).json({ success: true, data: { user }, token });
    } else {
      console.log("CREATING user!!!!!!!!!!!!!!!");
      const newUser = await UserSchema.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        username: user.userName,
        createdAt: Date.now(),
        favourites: [],
      });

      res.send(201).json({ success: true, data: { user: newUser }, token });
    }
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: false, message: err });
  }
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
