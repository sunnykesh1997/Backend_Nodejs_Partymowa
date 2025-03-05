
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    theme_name: { type: String, required: true },
    theme_img: { type: String, required: true }, 
    base_price: { type: Number, required: true },
    base_hr: { type: String, required: true },
    base_extra_person_price: { type: Number, required: true },
    price: { type: Number },
    hours: { type: String },
    extra_person_price: { type: Number },
});

module.exports = mongoose.model('Theme', themeSchema);



