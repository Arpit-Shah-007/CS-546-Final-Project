import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reasonSelections:[{
        type: String,
        required: true
    }],
    date:{
        type: Date,
        default: Date.now
    }
});


const Report = mongoose.model('Report', reportSchema);

export default Report;