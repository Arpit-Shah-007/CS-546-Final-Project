import express from "express";
import { createProject, updateProject, deleteProject, getAllProjects, getProjectById, addComment, likeDislikeProject, getComments } from "../controllers/project.controller.js";
import { userAuth } from "../middleware/auth.js";
import upload from "../helper/multer.js";
const router = express.Router();

// Projects routes
router.post('/', userAuth, upload.single('videoLink'), createProject); // Create a new Project
router.put('/:id', userAuth, upload.single('videoLink'), updateProject); // Update an existing Project
router.delete('/:id', userAuth, deleteProject); // Delete a project with the provided project id
router.get('/', userAuth, getAllProjects); // Get all projects

// Comments routes
router.post('/comments', upload.none(), userAuth, addComment); // Add a comment to a project
router.get('/comments', userAuth, getComments); // Get comments for a project

// Likes/Dislikes routes
router.post('/like-dislike', upload.none(), userAuth, likeDislikeProject); // Like/Dislike a project

router.get('/:id', userAuth, getProjectById); // Get a project by ID

export default router;