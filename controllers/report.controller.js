import xss from "xss";
import { createNewReport, deleteReportbyId, getReportbyId } from "../data/reports.js";
import Report from "../models/report.models.js";


// Controller function to create a new report
export const createReport = async (req, res) => {
   try {

    //const userId = req.user.id;
    const { projectId } = xss(req.body);
    const { reason } = xss(req.body);
    const { userId } = req.body;
    

    if (!userId || typeof userId !== 'string' || !Types.ObjectId.isValid(userId)) {
        throw ("Invalid user ID");
    }

    if (!projectId || typeof projectId !== 'string' || !Types.ObjectId.isValid(projectId)) {
        throw ("Invalid project ID");
    }

    if (!reason || typeof reason !== 'string') {
        throw ("Invalid reason");
    }

    const result = await createNewReport(userId, projectId, reasons);
    console.log("created")
    res.status(200).json(result)
    // res.render();
    // return
   } catch (error) {
    res.status(500).json({Error: error})
   }
};

// Controller function to fetch all reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to fetch a single report by ID
export const getReportById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        if (!id) {
            throw new Error("Id must be provided");
        }
    
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Id is not a valid ObjectId");
        }

        const foundReport = await getReportbyId(id);

        res.status(200).json(foundReport)
    } catch (error) {
        res.status(404).json({message: "could not find the report"})
    }
    

};

// Controller function to delete a report by ID
export const deleteReportById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)

        if (!id) {
            throw new Error("Id must be provided");
        }
    
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Id is not a valid ObjectId");
        }

        const deletedReport = await deleteReportbyId(id);

        console.log(deletedReport);

        res.status(200).json(deletedReport)
    } catch (error) {
        res.status(404).json({message: "could not find the report"});
    }
};
