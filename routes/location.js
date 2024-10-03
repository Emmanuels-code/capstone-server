const express = require('express');
const Location = require('../models/Location');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).send('Location not found');
        }
        res.json(location);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;