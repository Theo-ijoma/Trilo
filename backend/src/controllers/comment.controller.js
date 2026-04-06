import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Comment from "../models/Comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");

  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) =>{
    const {userId} = getAuth(req)
    const {postId} = req.params
    const {content} = req.body


    // check for comment content
    if(!content || content.trim() === ""){
        return res.status(400).json({error: "Comment content is required"})
    }

    const user = await User.findOne({ clerkId: userId})
    const post = await Post.findOne(postId)

    if(!user || !post) return res.status(404).json({error: "User or post not found"});

    const comment = await Comment.create({
        user: userId,
        post: postId,
        content, 
    })
    
    // link the comment to the Post 
    await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id}
    })

    // create notification if not commenting on your own post 
    if(post.user.toString() != user._id.toString()){
        await Notification.create({
            from: user._id,
            to: post.user,
            type: "comment",
            post: postId,
            comment: comment._id
        })
    }

    res.status(200).json({message: "Comment created successfully", comment})
});

export const deleteComment = asyncHandler(async (req, res) =>{
    const {userId} = getAuth(req)
    const {commentId} = req.params
});