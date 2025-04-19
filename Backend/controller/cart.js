const Cart = require('../models/cart');
const Menu = require('../models/menus');
const Restaurant = require('../models/restaurants');

// Récupérer le panier de l'utilisateur (1 panier par restaurants)
exports.getCart = async (req, res) => {
  try {
   const cart = await Cart.findOne({ user: req.user._id})
   .populate('items.item')
   .populate('restaurant');

   if (!cart) return res.status(404).json({ message: 'Panier vide' });
   res.status(200).json(cart);
  } catch (err) {
   res.status(500).json({ error: err.message});
  }
}


exports.addToCart = async (req, res) => {
  const { menuId, quantity } = req.body;

  try {
    // On récupère le menu à ajouter selon le restaurant qui lui est attribué
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) return res.status(404).json({ message: "Menu introuvable" });

    const restaurantId = menuItem.restaurant_id;
    // Récupére le panier de l'utilisayeur
    let cart = await Cart.findOne({ user: req.user.id });
    // Si le panier n'existe pas, on en créer un nouveau
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        restaurant: restaurantId,
        items: [{ item: menuId, quantity }],
      });
    } else {
      // On vérifie si le menu commandé est du meme restaurant
      if (cart.restaurant.toString() !== restaurantId.toString()) {
        cart.restaurant = restaurantId;
        cart.items = [{ item: menuId, quantity }];
      } else {
        // On check si l'article est déja dans le panier si non on l'ajoute
        const index = cart.items.findIndex((i) => i.item.toString() === menuId);
        if (index > -1) {
          cart.items[index].quantity += quantity;
        } else {
          cart.items.push({ item: menuId, quantity });
        }
      }
    }
    await cart.save(); // Sauvegarde du panier
    const populatedCart = await cart
      .populate("items.item")
      .populate("restaurant"); // Remplacement de l'id par les vrais menus et restaurants
    res.status(200).json(populatedCart); // OK, on renvoie le panier au client
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { menuId } = req.params; // On récupere l'id du plat

  try {
    // On cherche le panier de l'utilisateur 
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Panier introuvable" });
    // On retire tous les itmes dont l'ID correspond à celui du plat
    cart.items = cart.items.filter((i) => i.item.toString() !== menuId);

    await cart.save();
    // On retourne le manier mis a jour 
    const populatedCart = (await cart.populate("items.item")).populate(
      "restaurant"
    );
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer tout le panier 

exports.clearAllInCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Pas de panier à vider' });
    }
    cart.items = [];
    cart.restaurant = undefined;
    
    await cart.save();
    res.status(200).json({ message: 'Panier vidé avec succès'})
  } catch  (err) {
    res.status(500).json({ error: err.message})
  }
};