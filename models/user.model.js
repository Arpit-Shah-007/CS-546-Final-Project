import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profilePic: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
