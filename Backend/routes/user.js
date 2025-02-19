const express = require("express");
const router = express.Router();
const userController = require("../controller/auth");
const tokenValidation = require("../middleware/auth");

router.get("/profile", userController.getUserProfile);

module.exports = router;
