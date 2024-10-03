const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const favoriteRoutes = require('./routes/favorites');
const itineraryRoutes = require('./routes/itineraries');

const app = express();
app.use(express.json());
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/locations', locationRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/itineraries', itineraryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));