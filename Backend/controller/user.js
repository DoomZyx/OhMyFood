const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Utilisateur type 

exports.getUserProfile = (req, res, next) => {
  try {
    // Récupère le header d'authentification
    const authHeader = req.headers.authorization;

    // Si le token est manquant, renvoie une erreur 401
    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant" });
    }

    // Vérifie que la clé secrète est bien définie dans .env
    if (!process.env.RANDOM_SECRET_KEY) {
      throw new Error("env non chargé ou clé manquante");
    }

    // Extrait le token en retirant le "Bearer "
    const token = authHeader.split(" ")[1];

    // Décode et vérifie le token JWT avec la clé secrète
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_KEY);

    // Recherche l'utilisateur correspondant à l'id du token
    User.findOne({ _id: decodedToken.userId })
      .then((user) => {
        // Si aucun utilisateur trouvé
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        // Renvoie les infos de l'utilisateur (filtrées par toJSON s’il existe)
        res.status(200).json(user);
      })
      // Erreur dans la requête Mongo
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    // Token invalide
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      town,
      postalCode,
      oldPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Mise à jour des autres champs
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.address = address ?? user.address;
    user.town = town ?? user.town;
    user.postalCode = postalCode ?? user.postalCode;

    //vérification de l'ancien mot de passe
    if (newPassword) {
      if (!oldPassword || !(await bcrypt.compare(oldPassword, user.password))) {
        return res
          .status(403)
          .json({ message: "Ancien mot de passe incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (req.file) {
      user.profilePicture = `/images/profilePicture/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json(user); // grâce à .toJSON() le mdp sera exclu
  } catch (err) {
    console.error("Erreur updateUser:", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
