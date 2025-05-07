const mongoose = require("mongoose");

const restaurateurSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: Number,
      ref: "Restaurants",
      required: true,
    },
    siret: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{14}$/.test(v),
        message: "Numéro SIRET invalide",
      },
    },
    documents: {
      identityDocumentUrl: { type: String, required: false }, 
      proofOfOwnershipUrl: { type: String, required: false }, // Kbis
    },
    verified: { type: Boolean, default: false },
  },

  { collection: "Owner" }
);

// Ajout d'un index sur le restaurant pour optimiser les recherches
restaurateurSchema.index({ restaurant: 1 });

module.exports = mongoose.model("Restaurateur", restaurateurSchema);
