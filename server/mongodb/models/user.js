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

// Method to add an item to the favourites array
User.methods.addToFavourites = function (itemId) {
  if (!this.favourites.includes(itemId)) {
    this.favourites.push(itemId);
  } else {
    // If the item is already in favourites
    console.log(itemId, "removing this item");
    this.favourites = this.favourites.filter((item) => item !== itemId);
  }
  return this.save();
};

const UserSchema = mongoose.model("User", User);

export default UserSchema;
