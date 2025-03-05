const mongoose = require('mongoose');

const SelectedDecorationSchema = new mongoose.Schema({
  decorationName: { type: String, required: true },
  decorationPrice: { type: Number, required: true },
});

module.exports = mongoose.model('SelectedDecoration', SelectedDecorationSchema);
