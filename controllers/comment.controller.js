import { commentsData } from "../data/index.js";
import { Types } from "mongoose";

export const createComment = async (req, res) => {
  try {
    console.log("here")
    const content = req.body.content;
    console.log(content)
    const userId = req.user.id;
    console.log(userId)
    const projectId = req.params.id;
    console.log(projectId)
    if (!content || !userId || !projectId) {
      throw "All fields are required";
    }
    console.log(userId)
    console.log(projectId)
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
    const comment = await commentsData.createComment(
      content,
      userId,
      projectId
    );
    res.json(comment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const content = req.body.content;
    if (!id || !content) {
      throw "All fields are required";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string";
    }
    if (typeof content !== "string" || content.length === 0) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(id)) {
      throw "Please enter a valid string";
    }
    const comment = await commentsData.updateComment(id, content);
    res.json(comment);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw "Please provide a valid id";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(id)) {
      throw "Please enter a valid string";
    }
    const comment = await commentsData.deleteComment(id);
    res.json(comment);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
