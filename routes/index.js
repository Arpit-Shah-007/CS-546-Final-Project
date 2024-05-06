import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import projectRoutes from "./projectRoutes.js";
import commentRoutes from "./commentRoutes.js";
import Project from "../models/projects.models.js";

const constructorMethod = (app) => {
  app.get("/", async (req, res) => {
      const user = req.user;
      const isAdmin = user.role === 'admin';
  
      const projects = await Project.find().lean();
      //console.log(projects);
      res.render("dashboard", {
        projects,
        user: user,
        isAdmin: isAdmin});
  });
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/project", projectRoutes);
  app.use("/comment", commentRoutes);

  app.use("*", (req, res) => {
    res.render("error", { status: 404, message: "Page Not Found" });
  });
};

export default constructorMethod;
