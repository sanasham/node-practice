import mongoose from "mongoose";

export const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log(`database connection established`);
  } catch (err) {
    console.log("error: " + err);
  }
};
