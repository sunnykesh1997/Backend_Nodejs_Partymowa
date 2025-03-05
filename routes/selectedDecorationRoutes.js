
const express = require('express');
const SelectedDecoration = require('../models/SelectedDecoration');
const router = express.Router();

// Add selected decoration
router.post('/', async (req, res) => {
  try {
    console.log('Received selected decoration data:', req.body); // Log to check data
    const selectedDecoration = new SelectedDecoration(req.body);
    await selectedDecoration.save();
    res.status(201).json(selectedDecoration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all selected decorations
router.get('/', async (req, res) => {
  try {
    const selectedDecorations = await SelectedDecoration.find();
    res.status(200).json(selectedDecorations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
