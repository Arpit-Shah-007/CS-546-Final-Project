import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
const router = express.Router();

// Route to signup
router.post("/signup", register);

// Route to login
router.post("/login", login);

// Route to logout
router.post("/logout", logout);

router.route("/logout").get(logout);

export default router;
