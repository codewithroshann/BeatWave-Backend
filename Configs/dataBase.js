import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongodbURL = process.env.MONGODB_URL;
const connectDB = mongoose
  .connect(mongodbURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

export default connectDB;
