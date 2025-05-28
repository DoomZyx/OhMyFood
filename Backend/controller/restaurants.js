const Restaurant = require("../models/restaurants");
const Restaurateur = require("../models/owner");
const User = require("../models/user");
const fs = require("fs");
const { verifySiret } = require("../API/siretValidator");

exports.registerOwnerAndRestaurant = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const {
      name,
      street,
      lieu,
      postalCode,
      openingHours,
      restaurantPhoneNumber,
      deliveryZone,
      typeOfBusiness,
      siret,
      dineIn,
      takeout,
      delivery,
    } = req.body;

    // Vérification des champs requis
    if (
      !name ||
      !street ||
      !lieu ||
      !postalCode ||
      !openingHours ||
      !restaurantPhoneNumber ||
      !deliveryZone ||
      !typeOfBusiness ||
      !siret
    ) {
      console.log("BODY REÇU ===>", req.body);
      return res
        .status(400)
        .json({ error: "Tous les champs doivent être remplis." });
    }

    // Vérification des fichiers
    if (
      !req.files ||
      !req.files.identityDocumentUrl ||
      req.files.identityDocumentUrl.length === 0
    ) {
      console.log("FILES REÇUS ===>", req.files);
      return res
        .status(400)
        .json({ error: "Une pièce d'identité est requise." });
    }
    if (
      !req.files.proofOfOwnershipUrl ||
      req.files.proofOfOwnershipUrl.length === 0
    ) {
      return res.status(400).json({ error: "Un KBIS est requis." });
    }

    // Validation SIRET
    const isValidSiret = await verifySiret();
    if (!isValidSiret) {
      return res.status(400).json({ error: "Numéro SIRET invalide." });
    }

    let lastId = await Restaurant.findOne().sort({ _id: -1 }).limit(1);
    const newId = lastId ? lastId._id + 1 : 1;

    // Création du restaurant
    const newRestaurant = new Restaurant({
      _id: newId,
      user: userId,
      restaurant: newId,
      name,
      address: { street, lieu, code: postalCode },
      imageUrl: req.files?.imageUrl?.map((file) => file.filename) || [],
      openingHours: openingHours,
      restaurantPhoneNumber: restaurantPhoneNumber,
      services: {
        dineIn: dineIn === "true",
        takeout: takeout === "true",
        delivery: delivery === "true",
      },
      deliveryZone,
      typeOfBusiness,
    });

    const savedRestaurant = await newRestaurant.save();

    // Création du restaurateur lié
    const newOwner = new Restaurateur({
      _id: newId,
      user: userId,
      restaurant: newId,
      siret,
      documents: {
        identityDocumentUrl: req.files.identityDocumentUrl.map(
          (file) => file.filename
        ),
        proofOfOwnershipUrl: req.files.proofOfOwnershipUrl.map(
          (file) => file.filename
        ),
      },
    });

    await newOwner.save();
    await User.findByIdAndUpdate(userId, { owner: true });

    res.status(201).json({
      message: "Profil restaurateur créé avec succès",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error(error);

    // // Nettoyage des fichiers uploadés si erreur
    // if (req.files) {
    //   Object.values(req.files)
    //     .flat()
    //     .forEach((file) => {
    //       fs.unlink(`uploads/${file.filename}`, (err) => {
    //         if (err) console.error("Erreur suppression fichier:", err);
    //       });
    //     });
    // }

    res
      .status(500)
      .json({ error: "Erreur lors de la création du restaurant." });
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
        imageUrl: `${req.protocol}://${req.get("host")}/images/restaurants${
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
