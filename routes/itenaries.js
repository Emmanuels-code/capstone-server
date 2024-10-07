// routes/itinerary.js
const express = require('express');
const Itinerary = require('../model/Itenary.js');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Create a new itinerary for a user
router.post('/', authenticateToken, async (req, res) => {
    const { locationId, activities } = req.body;

    try {
        const newItinerary = new Itinerary({
            userId: req.user.id, // Attach the user's ID from the token
            locationId,
            activities,
        });

        await newItinerary.save();
        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all itineraries for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user.id }).populate('locationId');
        res.json(itineraries);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
