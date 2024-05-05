import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import Project from "../models/projects.models.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    // Call the function to seed data after connecting to the database
    seedUsers();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Seed data
const seedUsers = async () => {
  try {
    // Create users
    await User.create([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123"
        // Add other fields as needed
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: "password456"
        // Add other fields as needed
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: "alice123"
      },
      {
        firstName: "Bob",
        lastName: "Anderson",
        email: "bob@example.com",
        password: "bob456"
      },
      {
        firstName: "Emily",
        lastName: "Brown",
        email: "emily@example.com",
        password: "emily789"
      },
      {
        firstName: "David",
        lastName: "Martinez",
        email: "david@example.com",
        password: "david321"
      },
      {
        firstName: "Sarah",
        lastName: "Taylor",
        email: "sarah@example.com",
        password: "sarah654"
      },
      {
        firstName: "Michael",
        lastName: "Thomas",
        email: "michael@example.com",
        password: "michael987"
      },
      {
        firstName: "Olivia",
        lastName: "White",
        email: "olivia@example.com",
        password: "olivia123"
      },
      {
        firstName: "Ethan",
        lastName: "Harris",
        email: "ethan@example.com",
        password: "ethan456"
      }
    ]);


    //   await Project.create([
    //   {
    //     title: "Project 1",
    //     description: "Description of Project 1",
    //     branch: "Engineering",
    //     subject: "Web Development",
    //     author: "5a9427648b0beebeb6957a22",
    //     videoLink: "https://example.com/project1",
    //     likes: ["5a9427648b0beebeb6957b6e", "5a9427648b0beebeb6957a38", "5a9427648b0beebeb6957c7a", "5a9427648b0beebeb6957abd"],
    //     dislikes: []
    //   },
    //   {
    //     title: "Project 2",
    //     description: "Description of Project 2",
    //     branch: "Science",
    //     subject: "Machine Learning",
    //     author: "5a9427648b0beebeb695821f",
    //     videoLink: "https://example.com/project2",
    //     likes: ["5a9427648b0beebeb6957a22"],
    //     dislikes: ["5a9427648b0beebeb6957b6e", "5a9427648b0beebeb6957a38", "5a9427648b0beebeb6957c7a", "5a9427648b0beebeb6957abd"]
    //   },
    // ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection after seeding
    mongoose.disconnect();
  }
};
