import { query } from "express";
import { Types } from "mongoose";
import Project from "../models/projects.models.js";
import User from "../models/user.model.js";
import Comment from "../models/comments.models.js";


export const createProjectInDB = async (title, description, branch, subject, author, videoLink) => {
    
    if (!title || title.trim() === "") throw  'Please provide a valid title'
    if (!description || description.trim() === "") throw  'Please provide a valid description'
    if (!branch || branch.trim() === "") throw  'Please provide a valid branch'
    if (!subject || subject.trim() === "") throw  'Please provide a valid subject'
    if (!author || author.trim() === "") throw  'Please provide a valid author'
    if (!videoLink || videoLink.trim() === "") throw 'Video link must be provided'

    if (typeof title !== 'string') throw  'Title should be a string'
    if (typeof description !== 'string') throw  'Description should be a string'
    if (typeof branch !== 'string') throw  'Branch should be a string'
    if (typeof subject !== 'string') throw  'Subject should be a string'
    if (typeof author !== 'string' && !(author instanceof mongoose.Types.ObjectId)) throw  'Author should be a string or a valid ObjectId'   
    if (typeof videoLink !== 'string') throw  'Video link should be a string'

    // Create the project in the database
    const newProject = await Project.create({
        title,
        description,
        branch,
        subject,
        author,
        videoLink
    });
    await newProject.populate('author', 'firstName lastName');

    return newProject;
};


export const updateProjectInDB = async (projectId, title, description, branch, subject, author, videoLink) => {
    
    if (!projectId || !Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid project ID');
    }

   //Checking if the params exists
   if (!title || title.trim() === "") throw  'Please provide a valid title'
   if (!description || description.trim() === "") throw  'Please provide a valid description'
   if (!branch || branch.trim() === "") throw  'Please provide a valid branch'
   if (!subject || subject.trim() === "") throw  'Please provide a valid subject'
   if (!author || author.trim() === "") throw  'Please provide a valid author'
   if (!projectId || projectId.trim() === "") throw  'Please provide a valid projectId'
   if (!videoLink || videoLink.trim() === "") throw 'Video must be provided'

   // Checking correct types
   if (typeof title !== 'string') throw  'Title should be a string'
   if (typeof description !== 'string') throw  'Description should be a string'
   if (typeof branch !== 'string') throw  'Branch should be a string'
   if (typeof subject !== 'string') throw  'Subject should be a string'
   if (typeof author !== 'string' && !Types.ObjectId.isValid(author)) throw 'Author should be a string or a valid ObjectId'
   if (typeof projectId !== 'string' && !Types.ObjectId.isValid(projectId)) throw 'Invalid ProjectId'
   if (typeof videoLink !== 'string') throw  'Video link should be a string'


    // Create the project in the database
    try {
        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                title,
                description,
                branch,
                subject,
                author,
                videoLink
            },
            { new: true }
        );

        if (!updatedProject) {
            throw "Project not found or could not be updated";
        }
        return updatedProject; 
    } catch (error) {
        throw error; 
    }
};

export const getProjectForId = async (id) => {
    if(!id) throw "Please provide the id";
    if(id.trim() === "") throw "Id cannot be just white spaces";
    if(typeof id !== 'string' && !Types.ObjectId.isValid(id)) throw "Id should be a valid ObjectId"

    try {
        const project = await Project.findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'userId',
                select: 'firstName lastName'
            }
        })
        .populate('author', 'firstName lastName profilePic');
        if(!project) throw "Project not found with the provided id"

        return project;
    } catch (error) {
        throw error;
    }
}

export const deleteProjectForId = async (id) => {
    if(!id) throw "Please provide the id";
    if(id.trim() === "") throw "Id cannot be just white spaces";
    if(typeof id !== 'string' && !!Types.ObjectId.isValid(id)) throw "Id should be a valid ObjectId"

    try {
        const project = await Project.findById(id).populate('comments');
        if(!project) throw "Project not found with the provided id";

        // deleting the comment from db
        await  Promise.all(project.comments.map(async comment => {
            await Comment.findByIdAndDelete(comment._id)
        }))

        //deleting the project
        const deletedProject = await Project.findByIdAndDelete(id);
        
        return deletedProject;
    } catch (error) {
        throw error;
    }
}

export const findProjectForSearch = async (searchParam) =>{
    if(!searchParam) throw "Please provide the search parameter";
    if(typeof searchParam !== 'string') throw "Search Parameter must be a string";

    try {
        const projects = await Project.find({
            $or:[
                {title : {$regex: searchParam, $options: "i"}},
                {branch : {$regex: searchParam, $options: "i"}},
                {subject : {$regex: searchParam, $options: "i"}},
                {
                    author:{
                        $in: await User.find({
                            $or:[
                                {firstName: {$regex: searchParam, $options: "i"}},
                                {lastName: {$regex: searchParam, $options: "i"}},
                            ]
                        }).distinct('_id')
                    }
                }
            ]
        }).populate({
            path: 'author',
            select: 'firstName lastName'
        });

        if(!projects) throw "Could not find any project with provided search parameter";

        return projects
    } catch (error) {
        throw error;
    }

}



export const likeProject = async (userId, projectId) => {
    if (!userId) throw "Please provide the userId";
    if (userId.trim() === "") throw "userId cannot be just white spaces";
    if (typeof userId !== 'string' && !Types.ObjectId.isValid(userId)) throw "userId should be a valid ObjectId";

    if (!projectId) throw "Please provide the projectId";
    if (projectId.trim() === "") throw "projectId cannot be just white spaces";
    if (typeof projectId !== 'string' && !Types.ObjectId.isValid(projectId)) throw "projectId should be a valid ObjectId";

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        const userDislikedIndex = project.dislikes.indexOf(userId);

        if (project.likes.includes(userId)) {
            throw new Error("User has already liked this post");
        }

        if (userDislikedIndex !== -1) {
            // If user has disliked, remove from dislikes
            project.dislikes.splice(userDislikedIndex, 1);
        }

        project.likes.push(userId);
        await project.save();

        return "Post liked successfully";
    } catch (error) {
        throw error;
    }
};



// Data function for disliking a project
export const dislikeProject = async (userId, projectId) => {
    if (!userId) throw "Please provide the userId";
    if (userId.trim() === "") throw "userId cannot be just white spaces";
    if (typeof userId !== 'string' && !Types.ObjectId.isValid(userId)) throw "userId should be a valid ObjectId";

    if (!projectId) throw "Please provide the projectId";
    if (projectId.trim() === "") throw "projectId cannot be just white spaces";
    if (typeof projectId !== 'string' && !Types.ObjectId.isValid(projectId)) throw "projectId should be a valid ObjectId";

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        const userLikedIndex = project.likes.indexOf(userId);

        if (project.dislikes.includes(userId)) {
            throw new Error("User has already disliked this post");
        }

        if (userLikedIndex !== -1) {
            // If user has liked, remove from likes
            project.likes.splice(userLikedIndex, 1);
        }

        project.dislikes.push(userId);
        await project.save();

        return "Post disliked successfully";
    } catch (error) {
        throw error;
    }
};

