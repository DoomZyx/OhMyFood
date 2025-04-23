const mongoose = require("mongoose");

const livreurSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["deuxroues", "voiture", "other"],
      required: true,
    },
    licenseNumber: { type: String, required: false },
    availability: { type: Boolean, default: false },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  { collection: "Deliverer" }
);

// Pour géolocalisation efficace avec MongoDB
livreurSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Livreur", livreurSchema);
