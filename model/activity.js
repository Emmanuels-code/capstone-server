const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Activity name is required'],
        trim: true
    },
    spotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
        required: [true, 'Spot ID is required']
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'Location ID is required']
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot be more than 500 characters']
    },
    duration: {
        type: Number,
        min: [0, 'Duration must be a positive number']
    },
    thumbnailUrl: {
        type: String
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
