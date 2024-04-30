import express from "express";
import { createReport, getAllReports, getReportById, deleteReportById } from "../controllers/report.controller.js";
import { userAuth } from "../middleware/auth.js";
import upload from "../helper/multer.js";
const router = express.Router();

// Route to create a new report
router.post("/", upload.none(), userAuth, createReport);

// Route to fetch all reports
router.get("/", userAuth, getAllReports);

// Route to fetch a single report by ID
router.get("/:id", userAuth, getReportById);

// Route to delete a report by ID
router.delete("/:id", userAuth, deleteReportById);


export default router;