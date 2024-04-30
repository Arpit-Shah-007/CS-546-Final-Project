import authRoutes from "./authRoutes.js";
import projectRoutes from "./projectRoutes.js";
import userRoutes from "./userRoutes.js";
// import reportRoutes from "./reportRoutes.js";

const constructorMethod = (app) => {
  app.use("/", authRoutes);
  app.use("/projects", projectRoutes);
  app.use("/user", userRoutes);
  //   app.use("/report", reportRoutes);

  app.use("*", (req, res) => {
    res.render("error", { status: 404, message: "Page Not Found" });
  });
};

export default constructorMethod;
