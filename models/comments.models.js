import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;