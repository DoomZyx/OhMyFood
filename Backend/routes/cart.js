const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controller/cart');

router.get('/get', auth, cartController.getCart);

router.post('/post', auth, cartController.addToCart);

router.delete('/delete', auth, cartController.removeCartItem);

router.delete('/clear', auth, cartController.clearAllInCart);

module.exports = router;