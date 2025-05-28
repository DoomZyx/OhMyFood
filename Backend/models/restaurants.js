const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    lieu: { type: String, required: true }, // Ville
    code: { type: String, required: true }
  },
  restaurantPhoneNumber: { type: String, required: true },
  imageUrl: [{ type: String }],
  openingHours: { type: String, required: true },
  typeOfBusiness: { type: String, required: true },
  deliveryZone: { type: String, required: true },
  services: {
    dineIn: { type: Boolean, required: true },
    takeout: { type: Boolean, required: true },
    delivery: { type: Boolean, required: true }
  },
  menus: [{ type: Number, ref: "Menus" }],
}, { collection: "Restaurants" }); 

// Ajout d'index pour optimiser les recherches
restaurantsSchema.index({ user: 1 });
restaurantsSchema.index({ name: 1 });

module.exports = mongoose.model("Restaurants", restaurantsSchema);