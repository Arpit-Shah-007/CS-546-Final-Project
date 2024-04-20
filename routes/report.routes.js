import express from "express";

const router = express.Router();

// Route to create a new report
router.post("/", createReport);

// Route to fetch all reports
router.get("/", getAllReports);

// Route to fetch a single report by ID
router.get("/:reportId", getReportById);

// Route to delete a report by ID
router.delete("/:reportId", deleteReportById);


export default router;