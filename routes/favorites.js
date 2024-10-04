const express = require('express');
const Favorite = require('../model/Favorite');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id }).populate('locationId');
        res.json(favorites);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const favorite = new Favorite({
            userId: req.user.id,
            locationId: req.body.locationId,
        });
        await favorite.save();
        res.status(201).send('Favorite added');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
