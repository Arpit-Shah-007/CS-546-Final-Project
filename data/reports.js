import { Types } from 'mongoose';
import Report from "../models/report.models.js";

export const createNewReport = async (userId, projectId, reason) => {
    
    try {

        if (!userId || typeof userId !== 'string' || !Types.ObjectId.isValid(userId)) {
            throw ("Invalid user ID");
        }

        if (!projectId || typeof projectId !== 'string' || !Types.ObjectId.isValid(projectId)) {
            throw ("Invalid project ID");
        }

        if (!reason || typeof reason !== 'string') {
            throw ("Invalid reason");
        }

        const existingReport = await Report.findOne({ reportedBy: userId, projectId: projectId });
        //console.log(existingReport)
        if (existingReport) {
            throw "You have already created a report for this post";
        }

        const result = await Report.create({
            reportedBy: userId,
            projectId: projectId,
            reasonSelections: reason 
        });
        //console.log(result);

        if (!result) {
            throw "Could not create report";
        }

        return result;
    } catch (error) {
        throw error;
    }
};


export const getReportbyId = async (id) => {
    if (!id) {
        throw new Error("Id must be provided");
    }

    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Id is not a valid ObjectId");
    }
    try {
        const report = await Report.findById(id)

        if (!report) {
            throw new Error("Cannot find a report");
        }

        return report;
    } catch (error) {
        throw error;
    }
};


export const deleteReportbyId = async (id) => {
    if (!id) {
        throw new Error("Id must be provided");
    }

    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Id is not a valid ObjectId");
    }

    try {
        const report = await Report.findById(id)

        if (!report) {
            throw new Error("Cannot find a report");
        }

        return report;
    } catch (error) {
        throw error;
    }
};
