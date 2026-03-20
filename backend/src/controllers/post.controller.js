import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import User from "../models/User.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";

export const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "username firstName lastName profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username firstName lastName profilePicture",
        },
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate("user", "username firstName lastName profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username firstName lastName profilePicture",
        },
      });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const posts = await Post.find({ "user.username": username })
      .sort({ createdAt: -1 })
      .populate("user", "username firstName lastName profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username firstName lastName profilePicture",
        },
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ message: "Post content or image is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let imageUrl = "";

  if(imageFile) {
    try {
        // convert buffer to base64 for cloudinary upload
        const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: "social_media_app_posts",
            resource_type: "image",
            transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
                { format: "auto" },
            ],
            
        });

        imageUrl = uploadResponse.secure_url;

    } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return res.status(400).json({ message: "Failed to upload image" });
    }
  }

  const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  })
  res.status(201).json({post});
});

export const likePost = asyncHandler(async (req, res) => {
 
}); 