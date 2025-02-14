const express = require('express');
const router = express.Router();

const menuController = require('../controller/menus');


router.get('/:id', menuController.getMenusByRestaurant);
router.post('/:id', menuController.createMenu);
router.put('/:id/menus/:menuId', menuController.modifyMenusByRestaurant);
router.delete('/:id/menus/:menuId', menuController.deleteMenuByRestaurant);

module.exports = router;