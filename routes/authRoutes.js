import express from "express";
import {
  register,
  login,
  logout,
  resetPassword,
  changePassword,
} from "../controllers/auth.controller.js";
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

router
  .route("/reset-password/:id/:token")
  .get(async (req, res) => {
    const { id, token } = req.params;
    res.render("passwordChange", {
      title: "Reset Password",
      id,
      token,
      hasErrors: false,
    });
  })
  .post(changePassword);

router
  .route("/reset-password")
  .get(async (req, res) => {
    res.render("resetPassword", {
      title: "Forgot Password",
      hasErrors: false,
    });
  })
  .post(resetPassword);

export default router;
