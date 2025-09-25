const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", (req, res) =>
  res.render("signup", { title: "Sign Up", noHeaderFooter: true })
);
router.get("/login", (req, res) =>
  res.render("login", { title: "Login", noHeaderFooter: true })
);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/verify", authController.verifyEmail);

module.exports = router;
