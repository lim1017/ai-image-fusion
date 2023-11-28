import express from "express";
import * as dotenv from "dotenv";
import { verifyToken } from "../middleware/verifyToken.js";
import UserSchema from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const user = req.user.data;
  const token = req.token;
  console.log(user, "USER!!!!!!!!!");
  try {
    const isUser = await UserSchema.find().where("email", user.email);

    if (isUser) {
      console.log("user already Exists!!!");
      res.status(201).json({ success: true, data: { user }, token });
    } else {
      console.log("CREATING user!!!!!!!!!!!!!!!");
      const newUser = await UserSchema.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        username: user.userName,
        createdAt: Date.now(),
        favourites: [],
      });

      res.status(201).json({ success: true, data: { user: newUser }, token });
    }
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: false, message: err });
  }
});

export default router;
