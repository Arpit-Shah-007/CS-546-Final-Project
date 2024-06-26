import { Types } from "mongoose";
import {
  createProjectInDB,
  deleteProjectForId,
  dislikeProject,
  findProjectForSearch,
  getProjectForId,
  likeProject,
  updateProjectInDB,
} from "../data/projects.js";
import Project from "../models/projects.models.js";
import { ObjectId } from "mongodb";

// Controller function to create project
export const createProject = async (req, res) => {
  //console.log("object")
  try {
    const title = req.body.title;
    const description = req.body.description;
    const branch = req.body.branch;
    const subject = req.body.subject;
    const link = req.body.link;
    const resource = req.body.resources;
    const author = req.user.id;
    let videoLink;
    if (req.file) {
      videoLink = req.file.path;
    } else {
      videoLink = "/public/uploads/demo_1.mp4";
    }
    //console.log(videoLink);

    //Checking if the params exists
    if (!title || title.trim() === "") throw "Please provide a valid title";
    if (!description || description.trim() === "")
      throw "Please provide a valid description";
    if (!branch || branch.trim() === "") throw "Please provide a valid branch";
    if (!subject || subject.trim() === "")
      throw "Please provide a valid subject";
    if (!link || link.trim() === "") throw "Please provide a valid Link";
    if (!resource || resource.trim() === "")
      throw "Please provide a valid Resource";
    if (!author || author.trim() === "") throw "Please provide a valid author";
    if (!videoLink || videoLink.trim() === "") throw "Video must be provided";

    // Checking correct types
    if (typeof title !== "string") throw "Title should be a string";
    if (typeof description !== "string") throw "Description should be a string";
    if (typeof branch !== "string") throw "Branch should be a string";
    if (typeof subject !== "string") throw "Subject should be a string";
    if (typeof link !== "string") throw "Link should be a string";
    if (typeof resource !== "string") throw "Resource should be a string";
    if (typeof author !== "string" && !Types.ObjectId.isValid(author))
      throw "Author should be a string or a valid ObjectId";
    if (typeof videoLink !== "string") throw "Video link should be a string";

    const project = await createProjectInDB(
      title,
      description,
      branch,
      subject,
      author,
      link,
      resource,
      videoLink
    );

    //log before sending the response
    console.log(project);

    //res.status(201).json(newProject);
    res.render("show-project", {
      project: project.toObject(),
      title: "Project",
    });
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
      throw "Invalid project ID";
    }

    // Retrieve the project from the database
    const project = await getProjectForId(projectId);
    //console.log(project)
    // Check if the project exists
    if (!project) {
      throw "Project not found";
    }
    //console.log(project)
    // Render the update page with the project data
    res.render("updateProject", {
      project: project.project,
      title: "Update Project",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update project
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    // console.log(req.body)
    const { title } = req.body;
    const { description } = req.body;
    const { branch } = req.body;
    const { subject } = req.body;
    const { link } = req.body;
    const { resources } = req.body;
    const author = req.user.id;

    let videoLink;
    if (req.file) {
      videoLink = req.file.path;
    } else {
      videoLink = req.body.videoLink;
    }
    //console.log(videoLink)
    //Checking if the params exists
    if (!title || title.trim() === "") throw "Please provide a valid title";
    if (!link || link.trim() === "") throw "Please provide a valid title";
    if (!resources || resources.trim() === "")
      throw "Please provide a valid title";
    if (!description || description.trim() === "")
      throw "Please provide a valid description";
    if (!branch || branch.trim() === "") throw "Please provide a valid branch";
    if (!subject || subject.trim() === "")
      throw "Please provide a valid subject";
    if (!author || author.trim() === "") throw "Please provide a valid author";
    if (!projectId || projectId.trim() === "")
      throw "Please provide a valid projectId";
    if (!videoLink || videoLink.trim() === "") throw "Video must be provided";

    // Checking correct types
    if (typeof title !== "string") throw "Title should be a string";
    if (typeof link !== "string") throw "Title should be a string";
    if (typeof resources !== "string") throw "Title should be a string";
    if (typeof description !== "string") throw "Description should be a string";
    if (typeof branch !== "string") throw "Branch should be a string";
    if (typeof subject !== "string") throw "Subject should be a string";
    if (typeof author !== "string" && !Types.ObjectId.isValid(author))
      throw "Author should be a string or a valid ObjectId";
    if (typeof projectId !== "string" && !Types.ObjectId.isValid(projectId))
      throw "Invalid ProjectId";
    if (typeof videoLink !== "string") throw "Video link should be a string";

    const updatedProject = await updateProjectInDB(
      projectId,
      title,
      description,
      branch,
      subject,
      author,
      videoLink,
      link,
      resources
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    // console.log("project")
    if (!projectId) throw "Please provide a valid id";
    if (typeof projectId !== "string" || !Types.ObjectId.isValid(projectId))
      throw "Please provide a valid id";

    const deletedProject = await deleteProjectForId(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    //console.log(error)
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

    if (!projectId) throw "Please provide a valid id";
    if (typeof projectId !== "string" || !Types.ObjectId.isValid(projectId))
      throw "Please provide a valid id";

    const { project, likesCount, dislikesCount } = await getProjectForId(
      projectId
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const user = req.user;
    //project.current_user = req.user;
    const id = new ObjectId(user.id);
    //console.log(user)
    const isAdmin = user.role === "admin";

    //console.log(project)
    res.render("show-project", {
      likesCount,
      dislikesCount,
      id,
      user,
      project: project,
      isAdmin: isAdmin,
      title: "Project",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to search projects based on criteria
export const searchProjects = async (req, res) => {
  try {
    const { searchParam } = req.query;
    //console.log(searchParam)
    //console.log(searchParam)
    const projects = await findProjectForSearch(searchParam);
    //console.log(projects)
    if (projects.length === 0) {
      // If no projects were found, render the dashboard with a message
      res.render("dashboard", {
        message: "No projects found matching the search criteria.",
        projects: [],
      });
    } else {
      // If projects were found, render the dashboard with the projects
      const user = req.user;
      const isAdmin = user.role === "admin";
      res.render("dashboard", {
        projects,
        user,
        isAdmin,
        title: "Dashboard",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to sort projects based on criteria
export const sortProjects = async (req, res) => {
  const { sortBy } = req.query;
  console.log(sortBy);

  try {
    let sortCriteria = {};

    switch (sortBy) {
      case "date":
        sortCriteria = { datePosted: -1 };
        break;
      case "likes":
        sortCriteria = { likesCount: -1 };
        break;
      case "dislikes":
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
          likesCount: { $size: "$likes" }, // Calculate the length of the likes array
          dislikesCount: { $size: "$dislikes" }, // Calculate the length of the dislikes array
          datePosted: 1,
        },
      },
      { $sort: sortCriteria },
    ]);
    const user = req.user;
    const isAdmin = user.role === "admin";
    res.render("dashboard", {
      projects,
      user,
      isAdmin,
      title: "Dashboard",
    });
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
  const projectId = req.params.id;
  const userId = req.user.id;

  if (!userId) throw "Please provide the userId";
  if (userId.trim() === "") throw "userId cannot be just white spaces";
  if (typeof userId !== "string" && !Types.ObjectId.isValid(userId))
    throw "userId should be a valid ObjectId";

  if (!projectId) throw "Please provide the projectId";
  if (projectId.trim() === "") throw "projectId cannot be just white spaces";
  if (typeof projectId !== "string" && !Types.ObjectId.isValid(projectId))
    throw "projectId should be a valid ObjectId";

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
  const projectId = req.params.id;
  const userId = req.user.id;

  try {
    const message = await dislikeProject(userId, projectId);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
