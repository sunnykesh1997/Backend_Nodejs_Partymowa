const express = require('express');
const multer = require('multer');
const path = require('path');
const Addone = require('../models/Addone');
const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// POST: Create a new Addone with image uploads
router.post('/add', upload.array('images', 3), async (req, res) => {
  try {
    const { name, price } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Validate the received data
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newAddone = new Addone({
      name,
      price,
      images, // Save the file paths in the database
    });

    await newAddone.save();
    res.status(201).json({ message: 'Addone created successfully', newAddone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Addone' });
  }
});

// GET: Fetch all Addones
router.get('/', async (req, res) => {
  try {
    const addones = await Addone.find();
    res.status(200).json(addones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Addones' });
  }
});

// PUT: Update Addone by ID with image uploads
router.put('/update/:id', upload.array('images', 3), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const addone = await Addone.findByIdAndUpdate(
      id,
      { name, price, images },
      { new: true }
    );

    if (!addone) {
      return res.status(404).json({ message: 'Addone not found' });
    }

    res.status(200).json({ message: 'Addone updated successfully', addone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Addone' });
  }
});

// DELETE: Delete Addone by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const addone = await Addone.findByIdAndDelete(id);

    if (!addone) {
      return res.status(404).json({ message: 'Addone not found' });
    }

    res.status(200).json({ message: 'Addone deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting Addone' });
  }
});

module.exports = router;