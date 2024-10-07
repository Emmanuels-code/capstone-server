const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Spot name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Spot description is required'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    thumbnailUrl: {
        type: String,
        required: [true, 'Thumbnail URL is required']
    },
    coordinates: {
        latitude: {
            type: Number,
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            min: -180,
            max: 180
        }
    }
});

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Location name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    coordinates: {
        latitude: {
            type: Number,
            required: [true, 'Latitude is required'],
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            required: [true, 'Longitude is required'],
            min: -180,
            max: 180
        }
    },
    thumbnailUrl: {
        type: String,
        required: [true, 'Thumbnail URL is required']
    },
    spots: [SpotSchema] // Added spots to location
});

module.exports = mongoose.model('Location', LocationSchema);
