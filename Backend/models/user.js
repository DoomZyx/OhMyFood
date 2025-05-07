const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    imageUrl: { type: String, required: false },
    address: { type: String, required: true },
    town: { type: String, required: true },
    postalCode: { type: String, required: false },

    owner: { type: Boolean, default: false },
    deliverer: { type: Boolean, ref:'Deliverer', default: false },
  },
);

// Retire le mdp pour éviter de l'envoyer dans les réponses et de l'afficher dans la console 
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
