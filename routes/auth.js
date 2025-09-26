const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) =>
  res.render("login", { title: "Login", noHeaderFooter: true })
);
router.get("/forgot-password", (req, res) =>
  res.render("forgot-password", {
    title: "Forgot Password",
    noHeaderFooter: true,
  })
);

router.get("/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("reset-password", {
    title: "Reset Password",
    token,
    noHeaderFooter: true,
  });
});


// apis
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/verify", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
