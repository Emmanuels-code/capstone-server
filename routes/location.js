// routes/location.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Location = require('../model/location');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json({ status: 'success', data: locations });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a location by ID
router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).send('Location not found');
        }
        res.json({ status: 'success', data: location });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create a new location
router.post(
    '/',
    authenticateToken,
    [
        body('name').notEmpty().withMessage('Location name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        // Additional validations...
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        try {
            const location = new Location(req.body);
            await location.save();
            res.status(201).json({ status: 'success', data: location });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
);

// Get all spots for a location
router.get('/:id/spots', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).send('Location not found');
        }
        res.json({ status: 'success', data: location.spots });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new spot to a location
router.post('/:id/spots', authenticateToken, async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).send('Location not found');
        }
        location.spots.push(req.body); // Add the new spot to the location
        await location.save();
        res.status(201).json({ status: 'success', data: location.spots });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
