const express = require('express');
const SelectedRose = require('../models/SelectedRose');
const router = express.Router();

// Add selected rose
// Add selected rose
router.post('/', async (req, res) => {
  try {
    const selectedRose = new SelectedRose(req.body);
    await selectedRose.save();
    res.status(201).json(selectedRose);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all selected roses
router.get('/', async (req, res) => {
  try {
    const selectedRoses = await SelectedRose.find();
    res.status(200).json(selectedRoses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
