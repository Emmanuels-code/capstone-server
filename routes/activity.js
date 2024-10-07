const express = require('express');
const Activity = require('../model/Activity'); // Activity model
const authenticateToken = require('../middleware/auth');

const router = express.Router();

/**
 * POST /activity
 * Create a new activity
 * Example body: {
 *   "name": "Take pictures",
 *   "spotId": "spot_123",
 *   "locationId": "location_123",
 *   "notes": "Capture the sunset",
 *   "duration": 120,
 *   "thumbnailUrl": "https://example.com/eiffel.jpg"
 * }
 */
router.post('/', authenticateToken, async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * GET /activity/itinerary/:itineraryId
 * Retrieve all activities for a particular itinerary
 */
router.get('/itinerary/:itineraryId', authenticateToken, async (req, res) => {
    try {
        const activities = await Activity.find({ itineraryId: req.params.itineraryId });
        if (!activities || activities.length === 0) {
            return res.status(404).send('No activities found for this itinerary');
        }
        res.json(activities);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * PUT /activity/:activityId
 * Update an existing activity
 * Example body: {
 *   "name": "Take pictures at the Louvre",
 *   "duration": 150,
 *   "notes": "Focus on night photography"
 * }
 */
router.put('/:activityId', authenticateToken, async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.activityId,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!activity) {
            return res.status(404).send('Activity not found');
        }
        res.json(activity);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * DELETE /activity/:activityId
 * Remove an activity from the itinerary
 */
router.delete('/:activityId', authenticateToken, async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.activityId);
        if (!activity) {
            return res.status(404).send('Activity not found');
        }
        res.send('Activity deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
