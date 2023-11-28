import express from "express";
import * as dotenv from "dotenv";
import { verifyToken } from "../middleware/verifyToken.js";
import UserSchema from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const user = req.user.data;
  const token = req.user.token;
  try {
    const isUser = await UserSchema.findOne().where("email", user.email);
    console.log(isUser, "isUser");
    //user exists
    if (isUser) {
      console.log("User Exists Here is the User");

      const newToken = jwt.sign(isUser, process.env.SESSION_SECRET);

      res
        .status(201)
        .json({ success: true, data: { user: isUser, token: newToken } });
    } else {
      const newUser = await UserSchema.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        username: user.userName,
        createdAt: Date.now(),
        favourites: [],
      });
      const newToken = jwt.sign(newUser, process.env.SESSION_SECRET);

      console.log(newUser, "creating newUser");
      res
        .status(201)
        .json({ success: true, data: { user: newUser, token: newToken } });
    }
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: false, message: err });
  }
});

router.post("/user");

export default router;
