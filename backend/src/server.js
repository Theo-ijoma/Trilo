// Imports
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

// app
const app = express();

// Middleware
app.use(clerkMiddleware());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({error: err.message, message: "Internal server error!" });
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// create server
const startServer = async () => {
  try {
    // connect the mongoDB
    await connectDB();

    // start PORT
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server", error.message);
    process.exit(1);
  }
};

// Startserver
startServer();
