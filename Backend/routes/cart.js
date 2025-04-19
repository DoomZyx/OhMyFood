const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controller/cart');

router.get('/', auth, cartController.getCart);

router.post('/', auth, cartController.addToCart);

router.delete('/clear', auth, cartController.clearAllInCart);

router.delete('/:menuId', auth, cartController.removeFromCart);


module.exports = router;