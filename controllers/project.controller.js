import { Types } from "mongoose";
import { createProjectInDB, deleteProjectForId, dislikeProject, findProjectForSearch, getProjectForId, likeProject, updateProjectInDB } from "../data/projects.js";
import Project from "../models/projects.models.js";

// Controller function to create project
export const createProject = async (req, res) => {
    console.log("object")
    try {
        const { title } = req.body;
        const { description } = req.body;
        const { branch} = req.body;
        const { subject } = req.body;
        const { author } = req.body;
        let videoLink;
        if (req.file) {
            videoLink = req.file.path;
        }
        //console.log(videoLink);

        //Checking if the params exists
        if (!title || title.trim() === "") throw  'Please provide a valid title'
        if (!description || description.trim() === "") throw  'Please provide a valid description'
        if (!branch || branch.trim() === "") throw  'Please provide a valid branch'
        if (!subject || subject.trim() === "") throw  'Please provide a valid subject'
        if (!author || author.trim() === "") throw  'Please provide a valid author'
        if (!videoLink || videoLink.trim() === "") throw 'Video must be provided'

        // Checking correct types
        if (typeof title !== 'string') throw  'Title should be a string'
        if (typeof description !== 'string') throw  'Description should be a string'
        if (typeof branch !== 'string') throw  'Branch should be a string'
        if (typeof subject !== 'string') throw  'Subject should be a string'
        if (typeof author !== 'string' && !Types.ObjectId.isValid(author)) throw 'Author should be a string or a valid ObjectId'
        if (typeof videoLink !== 'string') throw  'Video link should be a string'

        const newProject = await createProjectInDB(
            title,
            description,
            branch,
            subject,
            author,
            videoLink
        );

        //log before sending the response
        console.log(newProject);

        //res.status(201).json(newProject);
        res.render('show-project', {newProject: newProject.toObject()})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Render update project page with the already existing project 
export const renderUpdate = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        // Validate projectId
        if (!projectId || !Types.ObjectId.isValid(projectId)) {
            throw 'Invalid project ID'
        }

        // Retrieve the project from the database
        const project = await getProjectForId(projectId);
        //console.log(project)
        // Check if the project exists
        if (!project) {
            throw 'Project not found';
        }

        // Render the update page with the project data
        res.render("updateProject", { project: project.toObject() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Controller function to update project
export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { title } = req.body;
        const { description } = req.body;
        const { branch } = req.body;
        const { subject } = req.body;
        const { author } = req.body;
        let videoLink;
        if (req.file) {
            videoLink = req.file.path;
        } else {
            videoLink = req.body.videoLink;
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

        const updatedProject = await updateProjectInDB(projectId, title, description, branch, subject, author, videoLink)

        if (!updatedProject) { 
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to delete project
export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        if(!projectId) throw "Please provide a valid id";
        if(typeof projectId !== 'string' || !Types.ObjectId.isValid(projectId)) throw "Please provide a valid id"

        const deletedProject = await deleteProjectForId(projectId);

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to get a project by ID
export const getProjectById = async (req, res) => {
    try {
        //console.log("IN GET PROJECT")
        const projectId = req.params.id;
        

        if(!projectId) throw "Please provide a valid id";
        if(typeof projectId !== 'string' || !Types.ObjectId.isValid(projectId)) throw "Please provide a valid id"

        const project = await getProjectForId(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const user = req.user;
        const isAdmin = user.role === 'admin';

        res.render("show-project", {
            project: project.toObject(),
            user: user,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to search projects based on criteria
export const searchProjects = async (req, res) => {
    const {searchParam} = req.query;
    //console.log(searchParam)

    if(!searchParam) throw "Please provide the search parameter";
    if(typeof searchParam !== 'string') throw "Search Parameter must be a string";

    const projects = await findProjectForSearch(searchParam);

    res.status(200).json(projects)
};

// Controller function to filter projects based on criteria
export const filterProjects = async (req, res) => {
    
};

// Controller function to sort projects based on criteria
export const sortProjects = async (req, res) => {
    const { sortBy } = req.query;
    //console.log(sortBy)

    try {
        let sortCriteria = {};

        
        switch (sortBy) {
            case 'date':
                sortCriteria = { datePosted: -1 }; 
                break;
            case 'likes':
                sortCriteria = { likesCount: -1 }; 
                break;
            case 'dislikes':
                sortCriteria = { dislikesCount: -1 }; 
                break;
            default:
                sortCriteria = { datePosted: -1 };
                break;
        }

        // Query projects
        const projects = await Project.aggregate([
            {
                $project: {
                    title: 1,
                    description: 1,
                    branch: 1,
                    subject: 1,
                    author: 1,
                    videoLink: 1,
                    likesCount: { $size: '$likes' }, // Calculate the length of the likes array
                    dislikesCount: { $size: '$dislikes' }, // Calculate the length of the dislikes array
                    datePosted: 1
                }
            },
            { $sort: sortCriteria }
        ]);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const like = async (req, res) => {
//     const {userId , projectId} = req.body//req.user.id;
//     //const  = req.body //req.params.id;
//     //console.log(userId)
//     //console.log(projectId)

//     try {

//     const project = await Project.findById(projectId);
//     //console.log(project)
//     const userDislikedIndex = project.dislikes.indexOf(userId);    

//     if(project.likes.includes(userId)){
//         return res.status(400).json({error: "User has already liked this post"})
//     }

//     if (userDislikedIndex !== -1) {
//         // If user has disliked
//         project.dislikes.splice(userDislikedIndex, 1);
//     }

//     project.likes.push(userId);
//     await project.save();

//     return res.status(200).json({message: "Post liked successfully"});
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }

export const like = async (req, res) => {
    const { userId, projectId } = req.body;
    
    if(!userId) throw "Please provide the userId";
    if(userId.trim() === "") throw "userId cannot be just white spaces";
    if(typeof userId !== 'string' && !Types.ObjectId.isValid(userId)) throw "userId should be a valid ObjectId"

    if(!projectId) throw "Please provide the projectId";
    if(projectId.trim() === "") throw "projectId cannot be just white spaces";
    if(typeof projectId !== 'string' && !Types.ObjectId.isValid(projectId)) throw "projectId should be a valid ObjectId"

    try {
        const message = await likeProject(userId, projectId);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


// export const disLike = async (req, res) => {
//     const {userId , projectId} = req.body//req.user.id;
//     //const  = req.body //req.params.id;
//     //console.log(userId)
//     //console.log(projectId)

//     try {

//     const project = await Project.findById(projectId);
//     //console.log(project)
//     const userLikedIndex = project.likes.indexOf(userId);    

//     if(project.dislikes.includes(userId)){
//         return res.status(400).json({error: "User has already disliked this post"})
//     }

//     if (userLikedIndex !== -1) {
//         // If user has disliked
//         project.likes.splice(userLikedIndex, 1);
//     }

//     project.dislikes.push(userId);
//     await project.save();

//     return res.status(200).json({message: "Post disliked successfully"});
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }

// Controller function for handling the request and response
export const dislike = async (req, res) => {
    const { userId, projectId } = req.body;

    try {
        const message = await dislikeProject(userId, projectId);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


