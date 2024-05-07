import express from "express";
import { createProject, updateProject, deleteProject, renderUpdate, sortProjects, searchProjects, like, getProjectById, dislike } from "../controllers/project.controller.js";
import { upload } from "../multer/config.js";
const router = express.Router();

// Search and Sort
router.get("/search", searchProjects);
router.get('/sort', sortProjects);

// To render Create Project Page
router.get("/create", (req, res) => {

    const user = req.user;
    const isAdmin = user.role === 'admin';
    res.render("create-project", {
      user: user,
      isAdmin: isAdmin
  });
})
router.post("/:id",upload.single('video'), updateProject);

router.post("/", upload.single('video'), createProject);
router.get("/:id", getProjectById)



// To update Project
router.get("/update/:id", renderUpdate);


// Get project by id


// To delete
router.delete("/:id", deleteProject);



// Like / Dislike 
router.post('/:id/like', like);
router.post('/:id/dislike', dislike);





export default router;