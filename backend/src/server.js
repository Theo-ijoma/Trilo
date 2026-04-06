// Imports
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import notificationRoute from "./routes/notification.route.js";
import {arcjetMiddleware} from "./middleware/arcjet.middleware.js"
// app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoute);
app.use("/api/notification", notificationRoute);





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

    if(ENV.NODE_ENV !== "production"){
      app.listen(ENV.PORT, ()=> console.log(`Server is up and running on PORT:`, ENV.PORT));
    }
  } catch (error) {
    console.log("Failed to start server", error.message);
    process.exit(1);
  }
};

// Startserver
startServer();


// export for vercel
export default app;