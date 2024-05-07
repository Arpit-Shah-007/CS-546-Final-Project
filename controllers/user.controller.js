import { userData } from "../data/index.js";
import { Types } from "mongoose";
import { like } from "./project.controller.js";
import User from "../models/user.model.js";

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
    const { user, projects, likesCount, dislikesCount } =
      await userData.getUserById(id);
    //res.json(user);
    //console.log(user)
    //console.log(projects[0])
    console.log(user);
    res.render("profile", {
      user,
      projects,
      likesCount,
      dislikesCount,
      title: "Profile",
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
    const { email, firstName, lastName } = req.body;

    // Validate input fields
    if (!id || !email || !firstName || !lastName) {
      throw "All fields are required";
    }
    if (typeof id !== "string" || id.length === 0) {
      throw "Please enter a valid string for ID";
    }
    if (
      typeof email !== "string" ||
      email.length === 0 ||
      typeof firstName !== "string" ||
      firstName.length === 0 ||
      typeof lastName !== "string" ||
      lastName.length === 0
    ) {
      throw "Please enter valid strings for email, first name, and last name";
    }
    if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
      throw "Invalid first name format";
    }
    if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
      throw "Invalid last name format";
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email.toLowerCase())) {
      throw "Invalid email format";
    }

    // Check if the user exists
    const oldUser = await userData.getUserById(id);
    if (!oldUser) {
      throw "User not found";
    }

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, firstName, lastName },
      { new: true }
    );

    // Check if the update was successful
    if (!updatedUser) {
      throw "Failed to update user";
    }

    res.redirect("/user/" + id); // Return the updated user document
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message });
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
