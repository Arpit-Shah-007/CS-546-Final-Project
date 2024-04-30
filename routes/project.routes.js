import express from "express";
import { createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
const router = express.Router();

// To Create a ne Project
router.post("/", createProject);

// To update a existing Project
router.put("/", updateProject);

//To delete the project with provided project id
router.delete("/:id", deleteProject);


export default router;