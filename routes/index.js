import express from 'express';
import authRouter from "./auth.routes.js";
import projectRouter from "./project.routes.js";
import reportRouter from "./report.routes.js"

const router = express.Router();


router.use("/auth", authRouter);
router.use("/project", projectRouter);
router.use("/report", reportRouter)



export default router;