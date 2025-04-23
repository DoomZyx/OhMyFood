const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: { type: String, required: true },
  lieu: { type: String, required: true },
  imageUrl: { type: String, required: true },
  businessRegistrationNumber: { type: String, required: true },
  menus: [{ type: Number, ref: "Menus" }],
}, { collection: "Restaurants" }); 

module.exports = mongoose.model("Restaurants", restaurantsSchema);