import express from 'express';
import { followUser, getCurrentUserProfile, getUserProfile, syncUser, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

// public route to get user profile by username

router.get("/profile/:username", getUserProfile);

// protected routes for user profile management
router.post ("/sync", protectRoute, syncUser);
router.get("/me", protectRoute, getCurrentUserProfile);
router.put("/profile", protectRoute, updateProfile);
router.post("/follow/:targetUserId", protectRoute, followUser);


// update user profile => auth



export default router;