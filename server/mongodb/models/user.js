import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  favourites: { type: Array, required: false },
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
