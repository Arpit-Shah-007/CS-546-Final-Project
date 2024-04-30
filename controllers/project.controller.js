import Project from '../models/projects.models.js'
import Comment from '../models/comments.models.js'
import Likes from '../models/likes.models.js'
import { generateImageUrl } from '../helper/utils.js';


// Controller function to create project
export const createProject = async (req, res) => {
    try {
        const { title, description, branch, subject, resources } = req.body;
        const videoLink = req.file ? req.file.filename : '';
        console.log(videoLink, req.file.path);
        const newProject = new Project({
            author: req.user._id,
            title,
            description,
            branch,
            subject,
            videoLink,
            resources: resources && resources != "" ? resources.split(',') : ""
        });

        await newProject.save();

        return res.json({ status: true, msg: 'Project created successfully', data: newProject });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to create project' });
    }
};

// Controller function to update project
export const updateProject = async (req, res) => {
    try {
        const { title, description, branch, subject, resources } = req.body;
        let videoLink = '';

        // Find the project by ID
        const existingProject = await Project.findOne({ _id: req.params.id, userId: req.user._id });
        if (!existingProject) {
            return res.status(404).json({ status: false, msg: 'Project not found' });
        }

        // Use existing videoLink if req.file is not available
        if (!req.file) {
            videoLink = existingProject.videoLink;
        } else {
            videoLink = req.file.filename;
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, description, branch, subject, resources, videoLink },
            { new: true }
        );

        return res.json({ status: true, msg: 'Project updated successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to update project' });
    }
};


// Controller function to delete project
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findOneAndDelete({ _id: req.params.id, author: req.user._id });

        if (!deletedProject) {
            return res.status(404).json({ status: false, msg: 'Project not found' });
        }

        return res.json({ status: true, msg: 'Project deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to delete project' });
    }
};

// Controller function to get all projects
export const getAllProjects = async (req, res) => {
    try {
        let filter = {};

        if (req.query.type === 'user') {
            filter.userId = req.user._id;
        }

        if (req.query.search) {
            const searchKeyword = req.query.search.trim();
            filter.$or = [
                { title: { $regex: new RegExp(searchKeyword, 'i') } },
                { description: { $regex: new RegExp(searchKeyword, 'i') } },
                { branch: { $regex: new RegExp(searchKeyword, 'i') } },
                { subject: { $regex: new RegExp(searchKeyword, 'i') } }
            ];
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const projects = await Project.find(filter).populate('author')
            .limit(limit)
            .skip(skip);

        projects.map((project) => {
            project.videoLink = project.videoLink && project.videoLink != "" ? generateImageUrl(project.videoLink) : ""
        })

        return res.json({ status: true, data: projects });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to get projects' });
    }
};


// Controller function to get a project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id }).populate('author');

        if (!project) {
            return res.status(404).json({ status: false, msg: 'Project not found' });
        }
        project.videoLink = project.videoLink && project.videoLink != "" ? generateImageUrl(project.videoLink) : ""
        let likedStatus = await Likes.findOne({ projectId: project._id, userId: req.user._id })
        likedStatus = likedStatus && likedStatus.type == "like" ? "like" : likedStatus && likedStatus.type == 'dislike' ? 'dislike' : 'no'
        return res.json({ status: true, data: { ...JSON.parse((JSON.stringify(project))), likedStatus } });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to get project' });
    }
};


export const addComment = async (req, res) => {
    try {
        const { projectId, content } = req.body;
        let userId = req.user._id
        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ status: false, msg: 'Project not found' });
        }

        // If the project exists, proceed to add the comment
        const newComment = new Comment({ projectId, userId, content });
        await newComment.save();

        return res.json({ status: true, msg: 'Comment added successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to add comment' });
    }
}

export const getComments = async (req, res) => {
    try {
        const { projectId, userId, page, limit } = req.query;

        let filter = {};

        if (projectId) {
            filter.projectId = projectId;
        }

        if (userId) {
            filter.userId = userId;
        }

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const comments = await Comment.find(filter).populate('userId')
            .sort({ createdAt: -1 }) // Sort by newest comments first
            .skip(skip)
            .limit(pageSize);

        return res.json({ status: true, comments });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to get comments' });
    }
}

// Controller function to like or dislike a project
export const likeDislikeProject = async (req, res) => {
    try {
        const { projectId, type } = req.body;
        let userId = req.user._id

        // Validate input fields
        if (!userId || !projectId || !type || !['like', 'dislike'].includes(type)) {
            return res.status(400).json({ status: false, msg: 'Invalid input data' });
        }

        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ status: false, msg: 'Project not found' });
        }

        // Check if the user has already liked/disliked the project
        let existingLike = await Likes.findOne({ userId, projectId });

        // If the user has already liked/disliked the project and is switching to the opposite action
        if (existingLike) {
            if (existingLike.type === type) {
                // If the user is switching to the same action, return success response without making changes
                return res.json({ status: true, msg: 'Project already liked/disliked' });
            } else {
                // If the user is switching to the opposite action, update the existing like
                existingLike.type = type;
                await existingLike.save();
            }
        } else {
            // If the user is liking/disliking the project for the first time
            const newLike = new Likes({ userId, projectId, type });
            await newLike.save();
        }

        // Update like/dislike counts in the project table
        const likesCount = await Likes.countDocuments({ projectId, type: 'like' });
        const dislikesCount = await Likes.countDocuments({ projectId, type: 'dislike' });
        project.likesCount = likesCount;
        project.dislikeCount = dislikesCount;

        // Save the updated project
        await project.save();

        return res.json({ status: true, msg: `Project ${type} successfully` });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, msg: 'Failed to like/dislike project' });
    }
};
