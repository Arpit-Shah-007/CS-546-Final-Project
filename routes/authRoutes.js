import express from "express";
import { register, login, logout } from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/register")
  .get(async (req, res) => {
    res.render("register", { title: "Register", hasErrors: false });
  })
  .post(register);

router
  .route("/login")
  .get(async (req, res) => {
    res.render("login", { title: "Login", hasErrors: false });
  })
  .post(login);

router.route("/logout").get(logout);

export default router;
