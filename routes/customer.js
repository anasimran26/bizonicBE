const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, customerController.createCustomer);
router.get("/", auth, customerController.getCustomers);
router.put("/:id", auth, customerController.updateCustomer);
router.delete("/:id", auth, customerController.deleteCustomer);

module.exports = router;
