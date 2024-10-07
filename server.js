const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/location');
const favoriteRoutes = require('./routes/favorites');
const itineraryRoutes = require('./routes/itenaries.js');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Move CORS middleware here, before the routes
app.use(cors());

app.use('/auth', authRoutes);
app.use('/locations', locationRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/itineraries', itineraryRoutes);

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
