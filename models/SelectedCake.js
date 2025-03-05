const mongoose = require('mongoose');

const selectedCakeSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  cakeName: { type: String, required: true },
  cakePrice: { type: Number, required: true },
  cakeQuantity: { type: String, required: true },
  cakeType: { type: String, enum: ['Egg', 'Eggless'], required: true },
});

const SelectedCake = mongoose.model('SelectedCake', selectedCakeSchema);

module.exports = SelectedCake;
