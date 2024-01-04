import express from "express";
import UserSchema from "../mongodb/models/user.js";
import { auth0JwtCheck } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", auth0JwtCheck, async (req, res) => {
  const userInfo = req.auth.payload;
  const email = userInfo.email;
  try {
    const user = await UserSchema.findOne().where("email", email);
    res.status(201).json({
      success: true,
      data: { user: user },
    });
  } catch (e) {
    console.log(e, "catch");
  }
});

//This route is for upading a users favourites
router.post("/favourites", auth0JwtCheck, async (req, res) => {
  const userInfo = req.auth.payload;
  const email = userInfo.email;
  const { itemId } = req.body;
  try {
    const user = await UserSchema.findOne().where("email", email);
    const updatedUser = await user.addToFavourites(itemId);

    res.status(201).json({
      success: true,
      data: { user: updatedUser },
    });
  } catch (e) {
    console.log(e, "catch add fav");
  }
});

export default router;
