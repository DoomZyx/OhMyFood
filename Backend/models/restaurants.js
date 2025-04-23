const mongoose = require("mongoose");
const { type } = require("os");

const restaurantsSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: { type: String, required: true },
  adress: {
  street: { type: String, required: true },
  city: { type: String, required: true },
  code: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  openingHours: { type: String, required: true },
  restaurantPhoneNumber: { type: String, required: true },
  services: {
    dineIn: { type: Boolean, required: true },
    takeout: { type: Boolean, required: true },
    delivery: { type: Boolean, required: true }
  },
  deliveryZone: { type: String, required: true },
  typeOfBusinnes: { type: String, required: true },
  menus: [{ type: Number, ref: "Menus" }],
}, { collection: "Restaurants" }); 

module.exports = mongoose.model("Restaurants", restaurantsSchema);