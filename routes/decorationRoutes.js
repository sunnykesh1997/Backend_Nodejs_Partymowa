// routes/decorationRoutes.js
const express = require('express');
const upload = require('../middleware/upload');
const Decoration = require('../models/Decoration');
const router = express.Router();

// Multer setup for file uploads

// Add a new decoration
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('File:', req.file);
    const newDecoration = new Decoration({
      name: req.body.name,
      image: req.file.path,
      price: req.body.price,
    });
    const savedDecoration = await newDecoration.save();
    res.status(201).json(savedDecoration);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all decorations
router.get('/', async (req, res) => {
  try {
    const decorations = await Decoration.find();
    res.status(200).json(decorations);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update a decoration
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
    };
    if (req.file) updatedData.image = req.file.path;

    const updatedDecoration = await Decoration.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedDecoration);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a decoration
router.delete('/:id', async (req, res) => {
  try {
    await Decoration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Decoration deleted successfully' });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
