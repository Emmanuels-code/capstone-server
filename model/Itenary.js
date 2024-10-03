const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'Location ID is required']
    },
    activities: [{
        name: {
            type: String,
            required: [true, 'Activity name is required'],
            trim: true
        },
        duration: {
            type: Number,
            required: [true, 'Activity duration is required'],
            min: [0, 'Duration must be a positive number']
        }
    }],
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);