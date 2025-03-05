const mongoose = require('mongoose');

const SelectedRoseSchema = new mongoose.Schema({
  roseName: { type: String, required: true },
  rosePrice: { type: Number, required: true },
});

module.exports = mongoose.model('SelectedRose', SelectedRoseSchema);

