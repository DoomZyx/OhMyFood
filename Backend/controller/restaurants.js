const Restaurant = require("../models/restaurants");
const fs = require("fs");

exports.createRestaurant = (req, res, next) => {
  try {
    const restaurantObject = req.body;

    const restaurant = new Restaurant({
      _id: restaurantObject._id,
      name: restaurantObject.name,
      lieu: restaurantObject.lieu,
      imageUrl: restaurantObject.imageUrl,
      userId: req.auth.userId,
    });

    restaurant
      .save()
      .then(() => {
        res.status(201).json({ message: "Restaurant ajouté avec succès !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error });
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

      if (restaurant.userId !== req.auth.userId) {
        return res
          .status(403)
          .json({ message: "Non autorisé à supprimer ce restaurant" });
      }

      const filename = restaurant.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Restaurant.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Restaurant supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
