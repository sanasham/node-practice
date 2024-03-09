import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      trim: true,
    },
    termCondition: {
      type: Boolean,
      required: [true, "Please check checkbox"],
    },
  },
  { timestamps: true }
);

//model

const userModel = mongoose.model("user", userSchema);
export default userModel;
