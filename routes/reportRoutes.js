import express from "express";
import {createReport,getAllReports,getReportById,deleteReportById} from "../controllers/report.controller.js"
//import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Route to create a new report
router.post("/:id", createReport);

// Route to fetch all reports
router.get("/", getAllReports);

// Route to fetch a single report by ID
router.get("/:id", getReportById);

// Route to delete a report by ID
router.delete("/:id", deleteReportById);


export default router;