const menus = require("../models/menus");
const fs = require("fs");
const router = require("../routes/menus");

const Menu = require("../models/menus");

exports.createMenu = (req, res, next) => {
  try {
    const menuObject = req.body;
    delete menuObject._usedId;

    const menu = new Menu({
      ...menuObject,
      restaurant_id: req.params.restaurant_id,
      userId: req.auth.userId,
    });

    menu
      .save()
      .then(() => {
        res.status(201).json({ message: "Menu ajouté avec succès !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMenusByRestaurant = async (req, res, next) => {
  try {
    const restaurant_id = Number(req.params.id);
    const menus = await Menu.find({ restaurant_id });
    if (menus.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun menu trouvé pour ce restaurant." });
    }
    res.status(200).json(menus);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.modifyMenusByRestaurant = (req, res, next) => {
  const restaurantObject = req.file
    ? {
        ...JSON.parse(req.body.restaurant),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Menu.updateOne(
    { _id: req.params.id, userId: req.auth.userId },
    { ...restaurantObject }
  )
    .then(() =>
      res.status(200).json({ message: "Restaurant modifié avec succès !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMenuByRestaurant = (req, res, next) => {
  Menu.findOne({ _id: req.params.id })
    .then((menu) => {
      if (!menu) {
        return res.status(404).json({ message: "Menu non trouvé !" });
      }
      if (menu.userId !== req.auth.userId) {
        return res
          .status(403)
          .json({ message: "Non autorisé à supprimer le menu" });
      }
      Menu.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Menu supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
