const express = require("express");
const router = express.Router();
const { updateBusinessProfile } = require("../controllers/businessController");
const auth = require("../middleware/authMiddleware");

router.put("/", auth, updateBusinessProfile);

module.exports = router;
