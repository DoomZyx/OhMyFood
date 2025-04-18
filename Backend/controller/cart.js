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
  const menuItem = await Menu.findbyId(menuId);
  if (!menuItem) return res.status(404).json({ message: 'Menu introuvable'});
  
  const restaurantId = menuItem.restaurant;

  let cart = await Cart.findOne({ user: req.user.id});

  if (!cart) {
   cart = new Cart({
    user: req.user.id,
    restaurant: restaurantId,
    items: [{ item: menuId, quantity }],
   });
  } else {
   if (cart.restaurant.toString() !== restaurantId.toString()) {
    cart.restaurant = restaurantId;
    cart.items = [{ item: menuId, quantity }];
  } else {
   const index = cart.items.findIndex(i => i.item.toString() === menuId);
   if (index > -1) {
    cart.items[index].quantity += quantity;
   } else {
    cart.items.push({ item: menuId, quantity });
    }
   }
  }
  await cart.save();
  const populatedCart = await cart.populate('items.item').populate('restaurant'); 
  res.status(200).json(populatedCart);
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
}