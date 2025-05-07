const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const tokenValidation = require("../middleware/auth");
const auth = require('../middleware/auth');
const upload = require("../middleware/multer-config");
const { verifySiret } = require("../API/siretValidator");

router.get("/profile", userController.getUserProfile);
router.put("/profile", auth, upload.single("avatar"), userController.updateUser);

router.get("/verify-siret/:siret", async (req, res) => {
 const { siret } = req.params;
 const result = await verifySiret(siret);
 res.status(200).json(result);
});


module.exports = router;
