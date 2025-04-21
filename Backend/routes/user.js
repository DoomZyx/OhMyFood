const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const tokenValidation = require("../middleware/auth");
const auth = require('../middleware/auth');

router.get("/profile", userController.getUserProfile);
router.put("/profile", auth, userController.updateUser);

module.exports = router;
