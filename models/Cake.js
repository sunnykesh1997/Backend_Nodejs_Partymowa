// models/Cake.js
const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  halfKgPrice: { type: Number, required: true },
  fullKgPrice: { type: Number, required: true },
  type: { type: String, enum: ['Egg', 'Eggless'], required: true }
});

module.exports = mongoose.model('Cake', cakeSchema);
