import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import projectRoutes from "./projectRoutes.js";
import commentRoutes from "./commentRoutes.js";

const constructorMethod = (app) => {
  app.use("/home", (req, res) => {
    res.render("dashboard", { title: "Projex" });
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
