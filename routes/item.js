const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, itemController.createItem);
router.get("/", auth, itemController.getItems);
router.put("/:id", auth, itemController.updateItem);
router.delete("/:id", auth, itemController.deleteItem);

module.exports = router;
