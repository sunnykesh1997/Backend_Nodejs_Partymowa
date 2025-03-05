const express = require('express');
const Cake = require('../models/Cake');
const router = express.Router();
const upload = require('../middleware/upload');

// Add a new cake
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, halfKgPrice, fullKgPrice, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    console.log('Received Cake Data:', { name, halfKgPrice, fullKgPrice, type, image });

    const newCake = new Cake({ name, halfKgPrice, fullKgPrice, type, image });
    await newCake.save();
    res.status(201).json({ message: 'Cake added successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all cakes
router.get('/', async (req, res) => {
  try {
    const { type } = req.query; // Optional query parameter
    const filter = type ? { type } : {};
    const cakes = await Cake.find(filter);
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a cake by ID (PUT)
router.put('/update/:editingId', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, halfKgPrice, fullKgPrice, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedCake = await Cake.findById(id);
    if (!updatedCake) {
      return res.status(404).json({ error: 'Cake not found' });
    }

    updatedCake.name = name || updatedCake.name;
    updatedCake.halfKgPrice = halfKgPrice || updatedCake.halfKgPrice;
    updatedCake.fullKgPrice = fullKgPrice || updatedCake.fullKgPrice;
    updatedCake.type = type || updatedCake.type;
    updatedCake.image = image || updatedCake.image;

    await updatedCake.save();
    res.status(200).json({ message: 'Cake updated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a cake by ID (DELETE)
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the cake
    const deletedCake = await Cake.findByIdAndDelete(id);

    if (!deletedCake) {
      return res.status(404).json({ error: 'Cake not found' });
    }

    res.status(200).json({ message: 'Cake deleted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
