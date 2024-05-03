import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Route to signup
router.post("/signup", signup);

// Route to login
router.post("/login", login);

// Route to logout
router.post("/logout", logout);



export default router;