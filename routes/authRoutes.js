import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

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

router.route("/").get((req, res) => {
  res.redirect("/login");
});

export default router;
