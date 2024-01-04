import express from "express";
import UserSchema from "../mongodb/models/user.js";
import { auth0JwtCheck } from "../middleware/verifyToken.js";

//TODO verify token with get accesstoken silently does not work atm.

const router = express.Router();

//This route is for upading a users favourites
router.post("/favourites", auth0JwtCheck, async (req, res) => {
  const userInfo = req.auth.payload;
  const email = userInfo.email;
  const { itemId } = req.body;
  try {
    const user = await UserSchema.findOne().where("email", email);
    const updatedUser = await user.addToFavourites(itemId);

    console.log(updatedUser, "updatedUser");

    res.status(201).json({
      success: true,
      data: { user: updatedUser },
    });
  } catch (e) {
    console.log(e, "catch add fav");
  }
});

export default router;
