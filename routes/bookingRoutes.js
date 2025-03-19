const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to handle booking submission
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cake, decoration, rose, addoneeffects, totalPrice } = req.body;  // Add addoneeffects here

    const updateData = {};

    if (cake) updateData.cake = cake;
    if (decoration) updateData.decoration = decoration;
    if (rose) updateData.rose = rose;
    if (addoneeffects) updateData.addoneeffects = addoneeffects;  // Add addoneeffects to update
    if (totalPrice) updateData.totalPrice = totalPrice;

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking updated successfully.', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cake, decoration, rose, addoneeffects, totalPrice } = req.body;

    console.log('Received Data:', req.body); // Debugging log

    // Prepare update object
    const updateData = {};
    if (cake) updateData.cake = cake;
    if (decoration) updateData.decoration = decoration;
    if (rose) updateData.rose = rose;
    if (addoneeffects) updateData.addoneeffects = addoneeffects; // Include addoneeffects
    if (totalPrice) updateData.totalPrice = totalPrice;

    console.log('Update Data:', updateData); // Debugging log

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking updated successfully.', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to fetch all bookings for the admin panel
router.get('/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('cake').populate('decoration').populate('rose');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to fetch all bookings for the admin panel
router.get('/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('cake').populate('decoration').populate('rose');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});







router.get('/booked-slots', async (req, res) => {
  try {
    const { theme, date } = req.query;
    if (!theme || !date) {
      return res.status(400).json({ message: "Theme and date are required." });
    }

    const bookings = await Booking.find({ theme, date });
    const bookedSlots = bookings.map(booking => booking.timeSlot);

    res.json({ bookedSlots });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});








// Route to fetch all bookings for the admin panel
router.get('/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('cake').populate('decoration').populate('rose');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
