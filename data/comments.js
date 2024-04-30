import Comment from "../models/comments.models";
import { Types } from "mongoose";

export const createComment = async (content, userId, postId) => {
  content = content.trim();
  userId = userId.trim();
  postId = postId.trim();

  if (!content || !userId || !postId) {
    throw "All fields are required";
  }

  if (
    typeof content !== "string" ||
    content.length === 0 ||
    typeof userId !== "string" ||
    userId.length === 0 ||
    typeof postId !== "string" ||
    postId.length === 0
  ) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
    throw "Please enter a valid string";
  }

  const newComment = new Comment({
    content,
    userId,
    postId,
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

export const getCommentsByPostId = async (postId) => {
  postId = postId.trim();

  if (!postId) {
    throw "Please provide a valid post id";
  }

  if (typeof postId !== "string" || postId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(postId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ postId });
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

export const deleteCommentsByPostId = async (postId) => {
  postId = postId.trim();

  if (!postId) {
    throw "Please provide a valid post id";
  }

  if (typeof postId !== "string" || postId.length === 0) {
    throw "Please enter a valid string";
  }

  if (!Types.ObjectId.isValid(postId)) {
    throw "Please enter a valid string";
  }

  const comments = await Comment.find({ postId });
  await Comment.deleteMany({ postId });
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
