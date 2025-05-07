const Restaurant = require("../models/restaurants");
const Restaurateur = require("../models/owner");
const User = require("../models/user");
const fs = require("fs");
const { getNextSequence } = require("../utils/idGenerator");

exports.registerOwnerAndRestaurant = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    // Génération d'un nouvel ID pour le restaurant
    const restaurantId = await getNextSequence('restaurantId');

    // Vérification des données requises
    if (!req.body.name || !req.body.street || !req.body.city || !req.body.postalCode) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis" });
    }

    const newRestaurant = new Restaurant({
      _id: restaurantId,
      user: userId,
      name: req.body.name,
      address: {
        street: req.body.street,
        city: req.body.city,
        code: req.body.postalCode,
      },
      imageUrl: req.files?.imageUrl?.map((file) => file.filename) || [],
      openingHours: req.body.openinghours,
      restaurantPhoneNumber: req.body.phoneNumber,
      services: {
        dineIn: req.body.dineIn === "true",
        takeout: req.body.takeout === "true",
        delivery: req.body.delivery === "true",
      },
      deliveryZone: req.body.deliveryZone,
      typeOfBusiness: req.body.typeOfBusiness,
    });

    const savedRestaurant = await newRestaurant.save();

    // Création du profil restaurateur
    const newOwner = new Restaurateur({
      user: userId,
      restaurant: savedRestaurant._id,
      siret: req.body.siret,
      documents: {
        identityDocumentUrl: req.files?.identityDocumentUrl?.map((file) => file.filename) || [],
        proofOfOwnershipUrl: req.files?.proofOfOwnershipUrl?.map((file) => file.filename) || [],
      }
    });

    await newOwner.save();
    await User.findByIdAndUpdate(userId, { owner: true });

    res.status(201).json({
      message: "Profil restaurateur créé avec succès",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error(error);
    // Nettoyage des fichiers en cas d'erreur
    if (req.files) {
      Object.values(req.files).forEach(files => {
        files.forEach(file => {
          fs.unlink(`uploads/${file.filename}`, (err) => {
            if (err) console.error("Erreur lors de la suppression du fichier:", err);
          });
        });
      });
    }
    res.status(500).json({ error: "Erreur lors de la création du restaurant" });
  }
};


exports.getAllRestaurants = (req, res, next) => {
  Restaurant.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.modifyRestaurant = (req, res, next) => {
  const restaurantObject = req.file
    ? {
        ...JSON.parse(req.body.restaurant),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Restaurant.updateOne(
    { _id: req.params.id, userId: req.auth.userId },
    { ...restaurantObject }
  )
    .then(() =>
      res.status(200).json({ message: "Restaurant modifié avec succès !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteRestaurant = (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant non trouvé !" });
      }

      if (restaurant.user.toString() !== req.auth.userId) {
        return res
          .status(403)
          .json({ message: "Non autorisé à supprimer ce restaurant" });
      }

      // Suppression de toutes les images associées
      const deleteImages = restaurant.imageUrl.map(imageUrl => {
        const filename = imageUrl.split("/images/")[1];
        return new Promise((resolve, reject) => {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });

      Promise.all(deleteImages)
        .then(() => {
          return Restaurant.deleteOne({ _id: req.params.id });
        })
        .then(() => {
          res.status(200).json({ message: "Restaurant supprimé !" });
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression:", error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
