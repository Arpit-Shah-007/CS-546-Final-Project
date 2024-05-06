import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import Project from "../models/projects.models.js";
import Comment from "../models/comments.models.js";
import Report from "../models/report.models.js";

// Load environment variables from .env file
dotenv.config();

const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/projex");

    // Seed users
    const users = await User.create([
      {
        firstName: "Niteesh",
        lastName: "Kulhari",
        email: "nkulhari@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "admin",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Arpit",
        lastName: "Shah",
        email: "arpit@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
        // Add other fields as needed
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
        // Add other fields as needed
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Bob",
        lastName: "Anderson",
        email: "bob@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Emily",
        lastName: "Brown",
        email: "emily@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "David",
        lastName: "Martinez",
        email: "david@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Sarah",
        lastName: "Taylor",
        email: "sarah@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Michael",
        lastName: "Thomas",
        email: "michael@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Olivia",
        lastName: "White",
        email: "Olivia@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      },
      {
        firstName: "Ethan",
        lastName: "Harris",
        email: "Ethan@stevens.edu",
        password: "$2b$10$Bvdzv3gSGF2OqViRQKHk3.6g0Hxm03IE/gjO2L767RFqN.McaToGW",
        role: "user",
        profilePic: "https://avatar.iran.liara.run/public"
      }
    ]);

    // Seed projects
    const projects = await Project.create([
      {
        title: "Web Development Portfolio",
        description: "Build a personal portfolio website to showcase your web development projects.",
        branch: "Engineering",
        subject: "Web Development",
        author: users[0]._id,
        videoLink: "public/uploads/demo_1.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: ["https://github.com/your-username/portfolio"],
      },
      {
        title: "Machine Learning Chatbot",
        description: "Develop a chatbot using machine learning techniques to provide assistance and answer user queries.",
        branch: "Computer Science",
        subject: "Machine Learning",
        author: users[0]._id,
        videoLink: "public/uploads/demo_1.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "E-commerce Website",
        description: "Create an online store with features for browsing products, adding items to cart, and processing orders.",
        branch: "Engineering",
        subject: "Web Development",
        author: users[0]._id,
        videoLink: "public/uploads/demo_2.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Mobile App for Fitness Tracking",
        description: "Develop a mobile application to track fitness activities such as running, cycling, and workouts.",
        branch: "Engineering",
        subject: "Mobile App Development",
        author: users[1]._id,
        videoLink: "public/uploads/demo_3.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Data Visualization Dashboard",
        description: "Build an interactive dashboard to visualize data and provide insights for decision-making.",
        branch: "Computer Science",
        subject: "Data Visualization",
        author: users[1]._id,
        videoLink: "public/uploads/demo_4.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Online Learning Platform",
        description: "Create a platform for online courses with features for video lectures, quizzes, and assignments.",
        branch: "Engineering",
        subject: "Web Development",
        author: users[1]._id,
        videoLink: "public/uploads/demo_2.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Social Media Analytics Tool",
        description: "Develop a tool to analyze social media data and provide insights on audience engagement and trends.",
        branch: "Computer Science",
        subject: "Data Analytics",
        author: users[2]._id,
        videoLink: "public/uploads/demo_3.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Game Development Project",
        description: "Create a multiplayer game with features for player interaction, scoring, and leaderboard.",
        branch: "Engineering",
        subject: "Game Development",
        author: users[2]._id,
        videoLink: "public/uploads/demo_4.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Artificial Intelligence Research",
        description: "Conduct research in artificial intelligence with focus on natural language processing and image recognition.",
        branch: "Computer Science",
        subject: "Artificial Intelligence",
        author: users[2]._id,
        videoLink: "public/uploads/demo_1.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Robotics Project",
        description: "Design and build a robotic system for automation tasks in industrial or domestic settings.",
        branch: "Engineering",
        subject: "Robotics",
        author: users[0]._id,
        videoLink: "public/uploads/demo_2.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Advanced Quantum Computing Algorithms",
        description: "Research and develop advanced algorithms for quantum computers to solve complex computational problems.",
        branch: "Physics",
        subject: "Quantum Computing",
        author: users[3]._id,
        videoLink: "public/uploads/demo_4.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Green Energy Technologies",
        description: "Investigate and develop technologies for renewable energy sources such as solar, wind, and hydro power.",
        branch: "Environmental Science",
        subject: "Energy Technology",
        author: users[3]._id,
        videoLink: "public/uploads/demo_3.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Healthcare Data Analytics",
        description: "Apply data analytics techniques to healthcare data for insights into patient care, disease prevention, and treatment outcomes.",
        branch: "Medical Science",
        subject: "Data Analytics",
        author: users[3]._id,
        videoLink: "public/uploads/demo_1.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Language Learning Mobile App",
        description: "Develop a mobile application for language learning with features for vocabulary, grammar, and speaking practice.",
        branch: "Linguistics",
        subject: "Language Learning",
        author: users[3]._id,
        videoLink: "public/uploads/demo_4.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Financial Market Analysis",
        description: "Conduct analysis of financial markets using statistical methods and machine learning algorithms for investment decision-making.",
        branch: "Finance",
        subject: "Financial Analysis",
        author: users[4]._id,
        videoLink: "public/uploads/demo_2.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Urban Planning and Design",
        description: "Study and design urban environments with focus on sustainable development, transportation, and infrastructure.",
        branch: "Architecture",
        subject: "Urban Planning",
        author: users[5]._id,
        videoLink: "public/uploads/demo_3.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Biomedical Engineering Innovation",
        description: "Innovate and develop new medical devices and technologies for diagnosis, treatment, and patient care.",
        branch: "Biomedical Engineering",
        subject: "Medical Technology",
        author: users[5]._id,
        videoLink: "public/uploads/demo_1.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Cultural Anthropology Research",
        description: "Conduct research in cultural anthropology to study human societies, beliefs, and practices across different cultures.",
        branch: "Anthropology",
        subject: "Cultural Studies",
        author: users[5]._id,
        videoLink: "public/uploads/demo_2.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Agricultural Innovation",
        description: "Research and develop innovative techniques and technologies for sustainable agriculture and food production.",
        branch: "Agriculture",
        subject: "Agricultural Science",
        author: users[0]._id,
        videoLink: "public/uploads/demo_4.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      {
        title: "Space Exploration Mission Planning",
        description: "Plan and design missions for space exploration, including manned and unmanned missions to explore celestial bodies.",
        branch: "Astronomy",
        subject: "Space Exploration",
        author: users[0]._id,
        videoLink: "public/uploads/demo_3.mp4",
        codeLink: "https://github.com/Niteesh-Kulhari/CS-546-Final-Project",
        likes: [],
        dislikes: [],
        comments: [],
        resources: [],
      },
      // Add more projects as needed
    ]);

    // Seed comments
    const comments = await Comment.create([
      // Comments for Project 1
      {
        projectId: projects[0]._id,
        userId: users[0]._id,
        content: "Great project! I love the design of your portfolio website.",
        
      },
      {
        projectId: projects[0]._id,
        userId: users[1]._id,
        content: "Very impressive work! Your portfolio showcases your skills effectively.",
        
      },
      {
        projectId: projects[0]._id,
        userId: users[2]._id,
        content: "I found your portfolio very inspiring. Keep up the good work!",
        
      },
      {
        projectId: projects[0]._id,
        userId: users[3]._id,
        content: "Excellent job on your portfolio! It's clean, professional, and well-organized.",
        
      },
      {
        projectId: projects[0]._id,
        userId: users[4]._id,
        content: "I really liked the color scheme you used in your portfolio. It's visually appealing.",
        
      },
      // Comments for Project 2
      {
        projectId: projects[1]._id,
        userId: users[0]._id,
        content: "The chatbot looks very promising. I'm excited to see it in action.",
        
      },
      {
        projectId: projects[1]._id,
        userId: users[1]._id,
        content: "This chatbot could be a game-changer in customer service. Well done!",
        
      },
      {
        projectId: projects[1]._id,
        userId: users[2]._id,
        content: "Impressive work on the chatbot. It's amazing how it can answer user queries effectively.",
        
      },
      {
        projectId: projects[1]._id,
        userId: users[3]._id,
        content: "Great project! I'm interested in learning more about the machine learning techniques used.",
        
      },
      {
        projectId: projects[1]._id,
        userId: users[4]._id,
        content: "I see a lot of potential in this chatbot. Keep up the good work!",
        
      },
      // Add comments for other projects similarly
    ]);

     // Loop through projects
     for (const project of projects) {
      // Randomly select 5 comments
      const randomComments = comments.sort(() => 0.5 - Math.random()).slice(0, 5);
      // Push each comment to the project's comments array
      for (const comment of randomComments) {
        project.comments.push(comment._id);
      }
      // Save the project to update the comments array
      await project.save();
    }
    

    // Seed reports
    const reports = await Report.create([
      // Reports for Project 1
      {
        reportedBy: users[0]._id,
        projectId: projects[0]._id,
        reasonSelections: "Inappropriate content",
        
      },
      {
        reportedBy: users[1]._id,
        projectId: projects[0]._id,
        reasonSelections: "Spam",
        
      },
      {
        reportedBy: users[2]._id,
        projectId: projects[0]._id,
        reasonSelections: "Copyright infringement",
        
      },
      // Reports for Project 2
      {
        reportedBy: users[0]._id,
        projectId: projects[1]._id,
        reasonSelections: "Inappropriate content",
        
      },
      {
        reportedBy: users[2]._id,
        projectId: projects[1]._id,
        reasonSelections: "Offensive language",
        
      },
      // Reports for other projects
      {
        reportedBy: users[3]._id,
        projectId: projects[2]._id,
        reasonSelections: "Inappropriate content",
        
      },
      {
        reportedBy: users[4]._id,
        projectId: projects[3]._id,
        reasonSelections: "Spam",
        
      },
      {
        reportedBy: users[1]._id,
        projectId: projects[4]._id,
        reasonSelections: "Copyright infringement",
        
      },
      {
        reportedBy: users[2]._id,
        projectId: projects[5]._id,
        reasonSelections: "Inappropriate content",
        
      },
      {
        reportedBy: users[3]._id,
        projectId: projects[6]._id,
        reasonSelections: "Offensive language",
        
      },
      {
        reportedBy: users[4]._id,
        projectId: projects[7]._id,
        reasonSelections: "Inappropriate content",
        
      },
    ]);
    

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Disconnect from the database after seeding
    mongoose.disconnect();
  }
};

seedData();

