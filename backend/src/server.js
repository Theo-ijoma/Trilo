import epress from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";


const app = epress();
connectDB()

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});