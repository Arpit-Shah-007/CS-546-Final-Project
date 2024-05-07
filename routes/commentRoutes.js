import express from "express";
const router = express.Router();

import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

router.route("/:id").post(createComment);

router.route("/:id").put(updateComment).delete(deleteComment);

export default router;
