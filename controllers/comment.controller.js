import { commentsData } from "../data";

export const createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
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
    const comment = await commentsData.createComment(content, userId, postId);
    res.json(comment);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw "Please provide a valid id";
    }
    if (typeof postId !== "string" || postId.length === 0) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(postId)) {
      throw "Please enter a valid string";
    }
    const comments = await commentsData.getCommentsByPostId(req.params.id);
    res.json(comments);
  } catch (e) {
    res.status(404).json({ error: e });
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
    const comment = await commentsData.updateComment(req.params.id, content);
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
