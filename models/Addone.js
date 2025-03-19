const mongoose = require('mongoose');

const AddoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String, // To store image paths
  }],
}, { timestamps: true });

const Addone = mongoose.model('Addone', AddoneSchema);

module.exports = Addone;
