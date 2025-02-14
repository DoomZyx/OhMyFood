const express = require("express");
const router = express.Router();

const restaurantCtrl = require("../controller/restaurants");

// Récupérer tous les restaurants
router.get("/", restaurantCtrl.getAllRestaurants);
router.post("/", restaurantCtrl.createRestaurant);
router.put("/id", restaurantCtrl.modifyRestaurant);
router.delete("/id", restaurantCtrl.deleteRestaurant);

module.exports = router;
