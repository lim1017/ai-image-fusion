import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
    required: [true, "User email required"],
  },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  favourites: { type: Array, required: false },
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
