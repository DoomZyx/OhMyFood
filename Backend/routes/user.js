const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const tokenValidation = require("../middleware/auth");
const auth = require('../middleware/auth');
const upload = require("../middleware/multer-config");

router.get("/profile", userController.getUserProfile);
router.put("/profile", auth, upload.single("avatar"), userController.updateUser);


module.exports = router;
