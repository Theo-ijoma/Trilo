import asynHandler from "express-async-handler";
import User from "../models/User.model.js";
import Notification from "../models/notification.model.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getUserProfile = asynHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});

export const updateProfile = asynHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOneandUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});

export const syncUser = asynHandler(async (req, res) => {
  const { userId } = getAuth(req);

  //check for existing user
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser) {
    return res.status(200).json({ user: existingUser });
  }

  //   create new user from Clerk data
  const clerkUser = await clerkClient.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0], // default username from email
    profilePicture: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);

  res.status(201).json({ user, message: "User created successfully" });
});

export const getCurrentUserProfile = asynHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });

  if (!user)  return res.status(404).json({ message: "User not found" }); 

  res.status(200).json({ user });
});

export const followUser = asynHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { targetUserId } = req.params;

    if (userId === targetUserId)  return res.status(400).json({ message: "You cannot follow yourself" });
     
     const currentUser = await User.findOne({ clerkId: userId });
        const targetUser = await User.findOne({ clerkId: targetUserId });

        if (!targetUser || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFollowing = currentUser.following.includes(targetUserId);

        if (isFollowing) {
            // Unfollow logic
            await User.findByIdAndUpdate(currentUser._id, {
                $pull: {following: targetUser._id}
            })

            await User.findByIdAndUpdate(targetUser._id, {
                $pull: {followers: currentUser._id}
            })

        } else{
            // follow logic
            await User.findByIdAndUpdate(currentUser._id, {
                $push: {following: targetUserId}
            }),
            await User.findByIdAndUpdate(targetUser._id, {
                $push: {followers: currentUser._id}
            })

        }

        // create notification 
        await Notification.create({
            from: currentUser._id,
            to: targetUser._id,
            type: "follow",
        })

        res.status(200).json({ message: isFollowing ? "User unfollowed successfully" : "User followed successfully" });
});
