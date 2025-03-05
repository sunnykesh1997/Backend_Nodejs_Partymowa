const express = require('express');
const upload = require('../middleware/upload');
const Rose = require('../models/Rose');
const router = express.Router();



// Create Rose
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = `/uploads/${req.file.filename}`; // Store image URL
    const newRose = new Rose({ name, price, image });
    await newRose.save();
    res.status(201).json(newRose);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all Roses
router.get('/', async (req, res) => {
  try {
    const roses = await Rose.find();
    res.status(200).json(roses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Rose
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const rose = await Rose.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    res.status(200).json(rose);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Rose
router.delete('/delete/:id', async (req, res) => {
  try {
    await Rose.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Rose deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
