import express from 'express';
import { signup, login, forgotPass, resetPass, getProfile } from '../controllers/auth.controller.js';
import { userAuth } from '../middleware/auth.js';
import upload from '../helper/multer.js';

const router = express.Router();

// Route to signup
router.post("/signup", upload.single('profilePic'), signup);

// Route to login
router.post("/login", upload.none(), login);

router.post("/forgot-password", upload.none(), forgotPass)

router.post('/reset-password/:token', upload.none(), resetPass)

router.get('/profile', userAuth, getProfile)

export default router;