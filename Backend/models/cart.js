const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');


const itemSchema = new mongoose.Schema({
  item: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Menu',
   required: true,
  },
  quantity: {
   type: Number,
   default: 1,
   min: 1,
  },
});

const cartSchema = new mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  unique: true,
 },
 restaurant: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Restaurant',
  required: true,
  unique: true,
 },
 items: [itemSchema]
});

module.exports = mongoose.model('Cart', cartSchema)