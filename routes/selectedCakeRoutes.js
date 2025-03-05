const express = require('express');
const Booking = require('../models/Booking');  // Import the Booking model
const router = express.Router();
const SelectedCake = require('../models/SelectedCake'); // Add this import


// Add selected cake data
// Update selected cakes for a specific booking
// Add selected cake data
router.post('/add', async (req, res) => {
  try {
  const { bookingId, cakeName, cakePrice, cakeQuantity, cakeType } = req.body;
    if (!bookingId || !cakeName || !cakePrice || !cakeQuantity || !cakeType) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const newSelectedCake = new SelectedCake({
      bookingId,
      cakeName,
      cakePrice,
      cakeQuantity,
      cakeType,
    });

    await newSelectedCake.save();
    booking.cake.push(newSelectedCake); // Push the selected cake details into the booking object
    await booking.save();

    res.status(201).json({ message: 'Selected cake added successfully!', newSelectedCake });
  } catch (error) {
    console.error('Error adding selected cake:', error);
    res.status(500).json({ error: error.message });
  }
});





// Route to fetch all selected cakes for a specific booking
router.get('/', async (req, res) => {
  try {
    const { bookingId } = req.query;
    
    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    // Find all selected cakes for the given bookingId
    const selectedCakes = await SelectedCake.find({ bookingId });
    
    if (!selectedCakes) {
      return res.status(404).json({ message: 'No selected cakes found for this booking.' });
    }

    res.json(selectedCakes);
  } catch (error) {
    console.error('Error fetching selected cakes:', error);
    res.status(500).json({ error: 'Error fetching selected cakes.' });
  }
});







// Fetch all selected cakes
router.get('/', async (req, res) => {
  try {
    const { bookingId } = req.query;
    const selectedCakes = await SelectedCake.find({ bookingId });
    res.json(selectedCakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
