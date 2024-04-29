import express from "express";

const router = express.Router();

router.route("/").get(async (req, res) => {
  res.render("dashboard", { title: "Projex:Home" });
});

export default router;
