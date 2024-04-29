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

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + "/public");

app.use("/public", staticDir);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
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
      // console.log(decoded);
      if (err) {
        res.redirect("/login");
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    const nonAuthenticatedRoutes = ["/login", "/register"];
    if (!nonAuthenticatedRoutes.includes(req.path)) {
      res.redirect("/login");
    } else {
      next();
    }
  }
});

app.use("/login", (req, res, next) => {
  if (req.method === "GET") {
    if (req.user) {
      res.redirect("/projects");
    } else next();
  } else next();
});

app.use("/register", (req, res, next) => {
  if (req.method === "GET") {
    if (req.user) {
      res.redirect("/projects");
    } else next();
  } else next();
});

configRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  connectToDB();
  console.log(`Your server is running on port ${PORT}`);
});
