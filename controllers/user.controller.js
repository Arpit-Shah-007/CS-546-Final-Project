import { userData } from "../data/index.js";
import { Types } from "mongoose";
import { like } from "./project.controller.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userData.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw "Please provide a valid id";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(id)) {
      throw "Please enter a valid string";
    }
    const {user, projects, likesCount, dislikesCount} = await userData.getUserById(id);
    //res.json(user);
    //console.log(user)
    //console.log(projects[0])

    res.render('profile', {
      user, 
      projects, 
      likesCount, 
      dislikesCount,
      title: "Profile"
    });
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      throw "Please provide a valid email";
    }
    if (typeof email !== "string" || email.length === 0) {
      throw "Please enter a valid string";
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
      throw "Invalid email.";
    }
    const user = await userData.getUserbyEmail(req.params.email);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    //const profilePic = req.body.profilePic;
    if (!id || !email || !firstName || !lastName ) {
      throw "All fields are required";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string";
    }
    if (
      typeof email !== "string" ||
      email.length === 0 ||
      typeof firstName !== "string" ||
      firstName.length === 0 ||
      typeof lastName !== "string" ||
      lastName.length === 0
    ) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(id)) {
      throw "Invalid Id";
    }
    if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
      throw "Invalid first name.";
    }

    if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
      throw "Invalid last name.";
    }

    if (!/^[a-zA-Z0-9]{2,25}$/.test(profilePic)) {
      throw "Invalid profile picture.";
    }

    if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email.toLowerCase())) {
      throw "Invalid email.";
    }

    const oldUser = await userData.getUserById(id);
    if (!oldUser) {
      throw "User not found.";
    }
    const user = await userData.updateUser(
      id,
      email,
      firstName,
      lastName
    );
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw "Please provide a valid id";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string";
    }
    if (!Types.ObjectId.isValid(id)) {
      throw "Please enter a valid string";
    }
    const user = await userData.deleteUser(id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e });
  }
};
