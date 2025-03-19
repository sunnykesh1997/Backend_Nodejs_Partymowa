const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  event: { type: String, required: true },
  persons: { type: Number, default: 4 },
  addons: { type: String, default: 'No' },
  theme: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  cake: [{
    cakeName: { type: String },
    cakePrice: { type: Number },
    cakeQuantity: { type: Number },
    cakeType: { type: String },
  }],
  decoration: [{
    decorationName: { type: String },
    decorationPrice: { type: Number },
  }],
  rose: [{
    roseName: { type: String },
    rosePrice: { type: Number },
  }],
  addoneeffects: [
    {
      addoneName: { type: String },
      addonePrice: { type: Number },
      addoneQuantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model('Booking', bookingSchema);
