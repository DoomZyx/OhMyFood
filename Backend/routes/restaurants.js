const express = require("express");
const router = express.Router();

const restaurantCtrl = require("../controller/restaurants");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");


router.get("/", restaurantCtrl.getAllRestaurants);

// router.get("/:id", restaurantCtrl.getOneRestaurant); A rajouter 

router.post(
  "/",
  auth,
  upload.fields([
    { name: "imageUrl" },
    { name: "identityDocumentUrl" },
    { name: "proofOfOwnershipUrl" }
  ]),
  restaurantCtrl.registerOwnerAndRestaurant
);

router.put("/:id", auth, restaurantCtrl.modifyRestaurant);
router.delete("/:id", auth, restaurantCtrl.deleteRestaurant);

module.exports = router;
