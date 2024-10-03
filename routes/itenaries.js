const express = require('express');
const Itinerary = require('../models/Itinerary');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/:locationId', async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({ locationId: req.params.locationId });
        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json(itinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:locationId', authenticateToken, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOneAndUpdate(
            { locationId: req.params.locationId },
            { $set: { activities: req.body.activities } },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(itinerary);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;