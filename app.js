import express from "express";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import connectToDB from "./db/connectToMongoDB.js";
import configRoutes from "./routes/index.js";
import jwt from "jsonwebtoken";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import handlebarsHelpers from "./helpers.js"
import Project from "./models/projects.models.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + "/public");

app.use("/public", staticDir);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" , helpers: handlebarsHelpers}));
app.set("view engine", "handlebars");

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};
app.use(rewriteUnsupportedBrowserMethods);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  const token = req.cookies.token?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.redirect("/auth/login");
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    const nonAuthenticatedRoutes = ["/auth/login", "/auth/register"];
    if (!nonAuthenticatedRoutes.includes(req.path)) {
      res.redirect("/auth/login");
    } else {
      next();
    }
  }
});

app.use("/auth/login", (req, res, next) => {
  if (req.method === "GET") {
    if (req.user) {
      res.redirect("/");
    } else next();
  } else next();
});

app.use("/auth/register", (req, res, next) => {
  if (req.method === "GET") {
    if (req.user) {
      res.redirect("/");
    } else next();
  } else next();
});

// app.get("/login", (req, res) => {
//   res.render("login");
// });
// app.get("/userProfile", (req, res) => {
//   res.render("profile");
// });



// app.get("/show", (req, res) => {
//   res.render("show-project");
// });

configRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  connectToDB();
  console.log(`Your server is running on port ${PORT}`);
});










