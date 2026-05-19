import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

     console.log("Connected to MongoDB✅");
  } catch (error) {
    console.log("Error connecting mongoDB", error);
    process.exit(1);
  }
};
