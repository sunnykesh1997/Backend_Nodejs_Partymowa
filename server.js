const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const Rose = require('./models/Rose');
const themeRoutes = require('./routes/themes');
const bookingRoutes = require('./routes/bookingRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
const decorationRoutes = require('./routes/decorationRoutes');  
const roseRoutes = require('./routes/roseRoutes');
const selectedRoseRoutes = require('./routes/selectedRoseRoutes');
const selectedDecorationRoutes = require('./routes/selectedDecorationRoutes')
// const selectedCakeRoutes = require('./routes/selectedCakeRoutes');
const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving images

// server.js
 // This serves images from the "uploads" folder


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Theme routes

app.use('/api/themes', themeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/decorations', decorationRoutes);
app.use('/api/roses', roseRoutes);
app.use('/api/selectedRose', selectedRoseRoutes);
app.use('/api/selectedDecor', selectedDecorationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
