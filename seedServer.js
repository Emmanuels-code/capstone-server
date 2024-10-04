require('dotenv').config();
const mongoose = require('mongoose');

// Use environment variable for MongoDB connection string, local maybe?
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/travel_planner';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define schemas (make sure these match your main server file)
const LocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
});

const ItinerarySchema = new mongoose.Schema({
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    activities: [{ name: String, duration: Number }],
});

// Define model
let Location, Itinerary;

// Check if the model already exist to avoid OverwriteModelError
if (mongoose.model.Location) {
    Location = mongoose.model('Location');
} else {
    Location = mongoose.model('Location', LocationSchema);
}

if (mongoose.model.Itinerary) {
    Itinerary = mongoose.model('Itinerary');
} else {
    Itinerary = mongoose.model('Itinerary', ItinerarySchema);
}

// Sample data
const locations = [
    {
        name: 'Paris, France',
        description: 'The City of Light, known for its art, cuisine, and iconic landmarks.',
        coordinates: { latitude: 48.8566, longitude: 2.3522 },
    },
    {
        name: 'Tokyo, Japan',
        description: 'A bustling metropolis blending ultra-modern and traditional culture.',
        coordinates: { latitude: 35.6762, longitude: 139.6503 },
    },
    {
        name: 'New York City, USA',
        description: 'The Big Apple, a global hub of culture, finance, and entertainment.',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
    },
    {
        name: 'Sydney, Australia',
        description: 'A vibrant city known for its stunning harbor and opera house.',
        coordinates: { latitude: -33.8688, longitude: 151.2093 },
    },
    {
        name: 'Rio de Janeiro, Brazil',
        description: 'Famous for its beaches, Carnival, and the statue of Christ the Redeemer.',
        coordinates: { latitude: -22.9068, longitude: -43.1729 },
    },
];

// Function to add locations and their itineraries
async function addLocationsAndItineraries() {
    try {
        // Clear existing data
        await Location.deleteMany({});
        await Itinerary.deleteMany({});
        console.log('Cleared existing data');

        for (const locationData of locations) {
            // Add location
            const location = new Location(locationData);
            await location.save();
            console.log(`Added location: ${location.name}`);

            // Add itinerary for the location
            const itinerary = new Itinerary({
                locationId: location._id,
                activities: [
                    { name: 'Arrive and check-in to hotel', duration: 2 },
                    { name: 'Visit main attractions', duration: 4 },
                    { name: 'Lunch at local restaurant', duration: 2 },
                    { name: 'Explore neighborhoods', duration: 3 },
                    { name: 'Dinner and evening entertainment', duration: 3 },
                ],
            });
            await itinerary.save();
            console.log(`Added itinerary for: ${location.name}`);
        }

        console.log('All sample data has been added successfully.');
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the function to add data
addLocationsAndItineraries();