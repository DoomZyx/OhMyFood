const express = require("express");
const router = express.Router();

const restaurantCtrl = require("../controller/restaurants");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");

// Récupérer tous les restaurants
router.get("/", restaurantCtrl.getAllRestaurants);
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
router.put("/id", restaurantCtrl.modifyRestaurant);
router.delete("/id", restaurantCtrl.deleteRestaurant);

module.exports = router;
