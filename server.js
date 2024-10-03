const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/travel_planner', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const LocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
});

const ItinerarySchema = new mongoose.Schema({
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    activities: [{ name: String, duration: Number }],
});

const FavoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
});

// Define models
const User = mongoose.model('User', UserSchema);
const Location = mongoose.model('Location', LocationSchema);
const Itinerary = mongoose.model('Itinerary', ItinerarySchema);
const Favorite = mongoose.model('Favorite', FavoriteSchema);

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Auth routes
app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Location routes
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/locations/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        res.json(location);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Itinerary routes
app.get('/locations/:id/itinerary', async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({ locationId: req.params.id });
        res.json(itinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Favorite routes
app.get('/favorites', authenticateToken, async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id }).populate('locationId');
        res.json(favorites);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/favorites', authenticateToken, async (req, res) => {
    try {
        const favorite = new Favorite({
            userId: req.user.id,
            locationId: req.body.locationId,
        });
        await favorite.save();
        res.status(201).send('Favorite added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional helpful endpoints

// Add a new location
app.post('/locations', authenticateToken, async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update an itinerary
app.put('/locations/:id/itinerary', authenticateToken, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOneAndUpdate(
            { locationId: req.params.id },
            { $set: { activities: req.body.activities } },
            { new: true, upsert: true }
        );
        res.json(itinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Search locations
app.get('/search', async (req, res) => {
    try {
        const locations = await Location.find({ name: { $regex: req.query.q, $options: 'i' } });
        res.json(locations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));