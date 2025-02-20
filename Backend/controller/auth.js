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
        phoneNumber: req.body.phoneNumber
      });
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
                 res.status(200).json({
                   userId: user._id,
                   token: jwt.sign(
                     { userId: user._id },
                     "RANDOM_TOKEN_SECRET",
                     { expiresIn: "24h" }
                   ),
                 });
             })
             .catch(error => res.status(500).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
};

exports.getUserProfile = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    User.findOne({ _id: decodedToken.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
