const mongoose = require("mongoose");

const menusSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    restaurant_id: { type: Number, required: true },
    ordre: { type: String, required: true },
    name: { type: String, required: true },
    namesuite: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: "Menus" }
);

module.exports = mongoose.model("Menus", menusSchema);
