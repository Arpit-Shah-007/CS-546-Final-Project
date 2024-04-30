import express from "express";
const router = express.Router();

import {
  getCommentsbyPostId,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

router.route("/").post(createComment);

router.route("/posts/:id/comments").get(getCommentsbyPostId);

router.route("/comment/:id").put(updateComment).delete(deleteComment);

export default router;
