import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../data/users";
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/:email").get(async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
