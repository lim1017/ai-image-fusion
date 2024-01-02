import express from "express";
import UserSchema from "../mongodb/models/user.js";

const router = express.Router();

//This route is for upading a users favourites
router.route("/favourites").post(async (req, res) => {
  // const userToken = req.user.data;
  const { itemId, email } = req.body;

  // console.log(userToken, "userToken");
  console.log(itemId, email, "itemId");

  try {
    const user = await UserSchema.findOne().where("email", email);
    console.log(user, "user!!!!!!!!!!!1");
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
