import express from "express";
import { createProject, updateProject, deleteProject, renderUpdate, sortProjects, searchProjects, like, getProjectById, dislike } from "../controllers/project.controller.js";
import { upload } from "../multer/config.js";
const router = express.Router();


// To render Create Project Page
router.get("/create", (req, res) => {
    res.render("createProject"); 
});
router.post("/", upload.single('video'), createProject);

// To update Project
router.get("/update/:id", renderUpdate);

router.put("/:id",upload.single('video'), updateProject);

// Get project by id
router.get("/:id", getProjectById)

// To delete
router.delete("/:id", deleteProject);

// Search and Sort
router.get("/search", searchProjects);
router.get('/sort', sortProjects);

// Like / Dislike 
router.post('/:id/like', like);
router.post('/:id/dislike', dislike);

export default router;