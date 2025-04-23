const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        town: req.body.town,
        postalCode: req.body.postalCode
      });
      console.log("Adresse reçue dans backend :", req.body);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
 User.findOne({ email: req.body.email })
     .then(user => {
         if (!user) {
             return res.status(401).json({ error: "Utilisateur non trouvé !" });
         }
         bcrypt.compare(req.body.password, user.password)
             .then(valid => {
                 if (!valid) {
                     return res
                       .status(401)
                       .json({ error: "Mot de passe incorrect !" });
                 }
                 if (!process.env.RANDOM_SECRET_KEY) {
                  throw new Error("env non chargé ou clé manquante");
                }
                 res.status(200).json({
                   userId: user._id,
                   token: jwt.sign(
                     { userId: user._id },
                     process.env.RANDOM_SECRET_KEY,
                     { expiresIn: "24h" }
                   ),
                 });
             })
             .catch(error => res.status(500).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
};


