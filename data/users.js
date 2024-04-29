import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  if (!user) {
    throw "Invalid username or password";
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw "Invalid username or password";
  }

  const token = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { token };
};
