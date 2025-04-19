const Cart = require('../models/cart');
const Menu = require('../models/menus');
const Restaurant = require('../models/restaurants');

// Récupérer le panier de l'utilisateur (1 panier par restaurants)
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.menu"); // ✅ populate menu
    if (!cart) return res.status(404).json({ message: "Panier vide" });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const menuId = Number(req.body.menuId);
    const quantity = Number(req.body.quantity) || 1;

    const menu = await Menu.findOne({ _id: menuId });
    if (!menu) return res.status(404).json({ error: "Menu introuvable" });

    const restaurantId = menu.restaurant_id;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        restaurant: restaurantId,
        items: [{ menu: menuId, quantity }],
      });
    } else {
      if (cart.restaurant !== restaurantId) {
        cart.restaurant = restaurantId;
        cart.items = [{ menu: menuId, quantity }];
      } else {
        const index = cart.items.findIndex((i) => i.menu === menuId);

        if (index !== -1) {
          cart.items[index].quantity += quantity;
        } else {
          cart.items.push({ menu: menuId, quantity });
        }
      }
    }

    await cart.save();
    await cart.populate("items.menu");

    res.status(200).json(cart);
  } catch (err) {
    console.error("Erreur addToCart:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const menuId = req.params.menuId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Panier introuvable" });

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(item => item.menu.toString() !== menuId);

    if (cart.items.length === originalLength) {
      return res
        .status(404)
        .json({ message: "Menu non trouvé dans le panier" });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Erreur removeFromCart:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer tout le panier

exports.clearAllInCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: "Panier introuvable" });
    }

    cart.items = []; // on vide tous les menus
    await cart.save();

    const clearedCart = await Cart.findById(cart._id).populate("items.menu");

    res.status(200).json({
      message: "Panier vidé avec succès",
      cart: clearedCart,
    });
  } catch (err) {
    console.error("clearAllInCart error:", err);
    res.status(500).json({ error: err.message });
  }
};