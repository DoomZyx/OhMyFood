// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: Number,
    required: true,
  },
  items: [
    {
      menu: {
        type: Number,
        ref: "Menus",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
