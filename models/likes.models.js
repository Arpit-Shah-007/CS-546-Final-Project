import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});


const Likes = mongoose.model('Likes', LikesSchema);

export default Likes;