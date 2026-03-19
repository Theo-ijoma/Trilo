import epress from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = epress();

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
      
    });
  } catch (error) {
    console.log("Failed to start server", error.message);
    process.exit(1);
  }
};

startServer();
