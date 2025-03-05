const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to handle booking submission
// Route to handle booking submission
router.post('/book', async (req, res) => {
  try {
    const { name, phone, date, timeSlot, event, persons, addons, theme, totalPrice, cakeDetails, decorationDetails } = req.body;

    if (!name || !phone || !date || !timeSlot || !event || !theme || !totalPrice) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

      // Check if the slot is already booked
      const existingBooking = await Booking.findOne({ date, timeSlot, theme });
      if (existingBooking) {
        return res.status(400).json({ message: 'This slot is already booked.' });
      }

    const newBooking = new Booking({
      name,
      phone,
      date,
      timeSlot,
      event,
      persons,
      addons,
      theme,
      totalPrice,
      cake: cakeDetails,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cake, decoration, rose, totalPrice } = req.body;

    // Prepare update object
    const updateData = {};
    if (cake) updateData.cake = cake;
    if (decoration) updateData.decoration = decoration;
    if (rose) updateData.rose = rose;
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
