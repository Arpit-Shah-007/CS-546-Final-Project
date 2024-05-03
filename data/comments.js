import Comment from "../models/comments.models.js";
import { Types } from "mongoose";

export const createComment = async (content, userId, projectId) => {
  content = content.trim();
  userId = userId.trim();
  projectId = projectId.trim();

  if (!content || !userId || !projectId) {
    throw "All fields are required";
  }

  if (
    typeof content !== "string" ||
    content.length === 0 ||
    typeof userId !== "string" ||
    userId.length === 0 ||
    typeof projectId !== "string" ||
    projectId.length === 0
  ) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(projectId)) {
    throw "Please enter a valid string";
  }

  const newComment = new Comment({
    content,
    userId,
    projectId,
  });

  await newComment.save();
  return newComment;
};

export const getCommentById = async (id) => {
  id = id.trim();

  if (!id) {
    throw "Please provide a valid id";
  }

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    !Types.ObjectId.isValid(id)
  ) {
    throw "Please enter a valid string";
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    throw "Comment not found";
  }
  return comment;
};

export const getCommentsByPostId = async (projectId) => {
  projectId = projectId.trim();

  if (!projectId) {
    throw "Please provide a valid project id";
  }

  if (typeof projectId !== "string" || projectId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(projectId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ projectId });
  return comments;
};

export const getCommentsByUserId = async (userId) => {
  userId = userId.trim();

  if (!userId) {
    throw "Please provide a valid user id";
  }

  if (typeof userId !== "string" || userId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ userId });
  return comments;
};

export const updateComment = async (id, content) => {
  id = id.trim();
  content = content.trim();

  if (!id || !content) {
    throw "All fields are required";
  }

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    typeof content !== "string" ||
    content.length === 0
  ) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(id)) {
    throw "Please enter a valid string";
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    throw "Comment not found";
  }

  comment.content = content;
  await comment.save();
  return comment;
};

export const deleteComment = async (id) => {
  id = id.trim();

  if (!id) {
    throw "Please provide a valid id";
  }

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    !Types.ObjectId.isValid(id)
  ) {
    throw "Please enter a valid string";
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    throw "Comment not found";
  }

  await Comment.findByIdAndDelete(id);
  return comment;
};

export const deleteCommentsByPostId = async (projectId) => {
  projectId = projectId.trim();

  if (!projectId) {
    throw "Please provide a valid project id";
  }

  if (typeof projectId !== "string" || projectId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(projectId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ projectId });
  await Comment.deleteMany({ projectId });
  return comments;
};

export const deleteCommentsByUserId = async (userId) => {
  userId = userId.trim();

  if (!userId) {
    throw "Please provide a valid user id";
  }

  if (typeof userId !== "string" || userId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ userId });
  await Comment.deleteMany({ userId });
  return comments;
};
