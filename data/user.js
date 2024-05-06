import User from "../models/user.model.js";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Project from "../models/projects.models.js";
const saltRounds = 10;

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  profilePic,
  role
) => {
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
  profilePic = profilePic.trim();
  role = role.trim();

  if (!firstName || !lastName || !email || !password || !profilePic || !role) {
    throw "All fields are required";
  }

  if (
    typeof firstName !== "string" ||
    firstName.length === 0 ||
    typeof lastName !== "string" ||
    lastName.length === 0 ||
    typeof email !== "string" ||
    email.length === 0 ||
    typeof password !== "string" ||
    password.length === 0 ||
    typeof profilePic !== "string" ||
    profilePic.length === 0 ||
    typeof role !== "string" ||
    role.length === 0
  ) {
    throw "Please enter a valid string";
  }

  if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
    throw "Invalid first name.";
  }

  if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
    throw "Invalid last name.";
  }
  email = email.toLowerCase();
  if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
    throw "Invalid email.";
  }
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password)) {
    throw "Invalid password.";
  }
  role = role.toLowerCase();
  if (role !== "admin" && role !== "user") {
    throw "Invalid role.";
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw "User already exists. Please login.";
  }

  password = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    profilePic,
    role,
  });
  await newUser.save();
  return { signupCompleted: true };
};

export const loginUser = async (email, password) => {
  email = email.trim();
  password = password.trim();
  

  if (!email || !password) {
    throw "All fields are required";
  }

  if (
    typeof email !== "string" ||
    email.length === 0 ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    throw "Please enter a valid string";
  }

  if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
    throw "Invalid email.";
  }
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password)) {
    throw "Invalid password.";
  }

  email = email.toLowerCase();
  const user = await User.findOne({ email });
  //console.log(user)
  if (!user) {
    throw "Invalid username or password";
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  // console.log("Password from database:", user.password);
  // console.log("Password provided by user:", password);
  // console.log("Password match:", passwordMatch);
if (!passwordMatch) {
    console.log("fail")
    throw "Invalid username or password";
}
  
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { token };
};

export const getUserbyEmail = async (email) => {
  email = email.trim();
  if (!email) {
    throw "All fields are required";
  }

  if (typeof email !== "string" || email.length === 0) {
    throw "Please enter a valid string";
  }

  if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
    throw "Invalid email.";
  }

  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    throw "User not found";
  }
  return user;
};

export const getUserById = async (id) => {
  if (!id) {
    throw "All fields are required";
  }

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    !Types.ObjectId.isValid(id)
  ) {
    throw "Please enter a valid string";
  }

  const user = await User.findById(id).lean();
  if (!user) {
    throw "User not found";
  }

  const projects = await Project.find({author: id}).lean();
  //console.log(projects)

  // Calulating likes and dislikes

  const likesCount = projects.reduce((total,project) => total + project.likes.length, 0);
  const dislikesCount = projects.reduce((total,project) => total + project.dislikes.length, 0);
  //console.log(likesCount)
  //console.log(dislikesCount)

  // user.projects = projects;
  // user.likesCount = likesCount;
  // user.dislikesCount = dislikesCount;
  
  return {user, projects, likesCount, dislikesCount};
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const updateUser = async (email, firstName, lastName, profilePic) => {
  email = email.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  profilePic = profilePic.trim();

  if (!email || !firstName || !lastName || !profilePic) {
    throw "All fields are required";
  }

  if (
    typeof email !== "string" ||
    email.length === 0 ||
    typeof firstName !== "string" ||
    firstName.length === 0 ||
    typeof lastName !== "string" ||
    lastName.length === 0 ||
    typeof profilePic !== "string" ||
    profilePic.length === 0
  ) {
    throw "Please enter a valid string";
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

  email = email.toLowerCase();
  if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
    throw "Invalid email.";
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw "User not found";
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.profilePic = profilePic;
  await user.save();
  return { updateCompleted: true };
};

// export const deleteUser = async (email) => {
//   email = email.trim();
//   if (!email) {
//     throw "All fields are required";
//   }

//   if (typeof email !== "string" || email.length === 0) {
//     throw "Please enter a valid string";
//   }

//   if (!/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email)) {
//     throw "Invalid email.";
//   }

//   email = email.toLowerCase();
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw "User not found";
//   }
//   await user.remove();
//   return { deleteCompleted: true };
// };

export const deleteProjectByUserId = async (id) => {
    if (!id) {
        throw "Please provide a valid id";
      }
      if (typeof id !== "string" || id.trim() === "") {
        throw "Please enter a valid string";
      }
      if (!Types.ObjectId.isValid(id)) {
        throw "Please enter a valid objectId";
      }

    try {
        // await Project.deleteMany({author: id});
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {

    if (!id) {
        throw "Please provide a valid id";
      }
      if (typeof id !== "string" || id.trim() === "") {
        throw "Please enter a valid string";
      }
      if (!Types.ObjectId.isValid(id)) {
        throw "Please enter a valid objectId";
      }

    try {

        const deletedUser = await User.findByIdAndDelete(id);
        
        // Return the deleted user
        return deletedUser;
    } catch (error) {
        // If an error occurs, throw it
        throw error;
    }
};
