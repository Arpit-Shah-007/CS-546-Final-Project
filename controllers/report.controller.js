import Report from '../models/report.models.js'

// Controller function to create a new report
export const createReport = async (req, res) => {
    try {
        let { projectId, reasonSelections } = req.body;
        let reportedBy = req.user._id
        // Validate input fields
        if (!reportedBy || !projectId || !reasonSelections || !Array.isArray(reasonSelections.split(','))) {
            return res.status(400).json({ status: false, msg: 'Invalid input data' });
        }

        // Create a new report
        const newReport = new Report({ reportedBy, projectId, reasonSelections });
        await newReport.save();

        return res.json({ status: true, msg: 'Report created successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to create report' });
    }
};

// Controller function to fetch all reports
export const getAllReports = async (req, res) => {
    try {

        let filter = {};
        if (req.query.productId) {
            filter.productId = req.query.productId;
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reports = await Report.find(filter)
            .sort({ createdAt: -1 }) // Sort by descending createdAt date
            .skip(skip)
            .limit(limit);
        return res.json({ status: true, reports });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to fetch reports' });
    }
};

// Controller function to fetch a single report by ID
export const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ status: false, msg: 'Report not found' });
        }
        return res.json({ status: true, report });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to fetch report' });
    }
};

// Controller function to delete a report by ID
export const deleteReportById = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            return res.status(404).json({ status: false, msg: 'Report not found' });
        }
        return res.json({ status: true, msg: 'Report deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to delete report' });
    }
};

