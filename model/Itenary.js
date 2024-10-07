const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added userId
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    activities: [{
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        spot: { type: String },  // Added spot field to specify the spot within the location
    }],
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
