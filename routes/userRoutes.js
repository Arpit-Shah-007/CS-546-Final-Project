import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserById);

router.route("/email/:email").get(getUserByEmail);

router.route("/update/:id").put(updateUser);

router.route("/delete/:id").delete(deleteUser);

export default router;
