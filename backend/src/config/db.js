 import mongoose from "mongoose"
 import { ENV } from "./env";
 
 export const connectDB = async () =>{
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log("Connected to MongoDB✅");
    } catch (error) {
        console.log("Error connecting mongoDB", error);
        process.exit(1)
    }
 }