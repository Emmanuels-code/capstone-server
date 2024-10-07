require('dotenv').config();
const mongoose = require('mongoose');

// Use environment variable for MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/travel_planner';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define schemas
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
    spots: [SpotSchema] // Embed the Spot schema
});

// Define models
const Location = mongoose.model('Location', LocationSchema);

// Sample data for locations and spots
const locationsData = [
    {
        name: 'Paris, France',
        description: 'The City of Light, known for its art, cuisine, and iconic landmarks.',
        coordinates: { latitude: 48.8566, longitude: 2.3522 },
        thumbnailUrl: 'https://digital.ihg.com/is/image/ihg/intercontinental-paris-7596881385-2x1', // Thumbnail URL for Paris
        spots: [
            {
                name: 'Eiffel Tower',
                description: 'Iconic symbol of France.',
                thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0PjzcACuCnj45otxywWk5_TMJa-YAaAtNJw&s',
                coordinates: { latitude: 48.8584, longitude: 2.2945 }
            },
            {
                name: 'Louvre Museum',
                description: 'World-renowned museum.',
                thumbnailUrl: 'https://cdn.britannica.com/02/121002-050-92DB902F/Louvre-Museum-pyramid-Paris-Pei-IM.jpg',
                coordinates: { latitude: 48.8606, longitude: 2.3376 }
            },
            {
                name: 'Notre-Dame Cathedral',
                description: 'Gothic masterpiece.',
                thumbnailUrl: 'https://cdn.britannica.com/85/83885-050-9CDCFEA9/Notre-Dame-de-Paris-France.jpg',
                coordinates: { latitude: 48.852968, longitude: 2.349902 }
            },
            {
                name: 'Champs-Élysées',
                description: 'Famous avenue known for shopping and theaters.',
                thumbnailUrl: 'https://www.introducingparis.com/f/francia/paris/guia/campos-eliseos.jpg',
                coordinates: { latitude: 48.8656, longitude: 2.3212 }
            },
            {
                name: 'Montmartre',
                description: 'Historic district with artistic heritage.',
                thumbnailUrl: 'https://blushrougette.com/wp-content/uploads/2021/07/sacre-coeur-basilica-paris-1460x973.jpg',
                coordinates: { latitude: 48.8867, longitude: 2.3431 }
            }
        ]
    },
    {
        name: 'Tokyo, Japan',
        description: 'A bustling metropolis blending ultra-modern and traditional culture.',
        coordinates: { latitude: 35.6762, longitude: 139.6503 },
        thumbnailUrl: 'https://www.gotokyo.org/en/story/guide/spring/images/45_0126_3.jpg', // Thumbnail URL for Tokyo
        spots: [
            {
                name: 'Shinjuku Gyoen',
                description: 'Beautiful park with gardens.',
                thumbnailUrl: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000716/img/basic/a0000716_main.jpg',
                coordinates: { latitude: 35.6852, longitude: 139.7100 }
            },
            {
                name: 'Senso-ji Temple',
                description: 'Tokyo\'s oldest temple.',
                thumbnailUrl: 'https://www.senso-ji.jp/images_en/visit_img07_l.jpg',
                coordinates: { latitude: 35.7148, longitude: 139.7967 }
            },
            {
                name: 'Shibuya Crossing',
                description: 'Famous pedestrian scramble.',
                thumbnailUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/190614113003-19-shibuya-crossing-story-only.jpg?q=w_1110,c_fill',
                coordinates: { latitude: 35.6595, longitude: 139.7004 }
            },
            {
                name: 'Tokyo Skytree',
                description: 'Tallest structure in Japan.',
                thumbnailUrl: 'https://www.kikukawa.com/en/wp-content/uploads/sites/3/2016/08/732bc04311edcb17a5234c41d382d5e5.jpg',
                coordinates: { latitude: 35.7106, longitude: 139.8107 }
            },
            {
                name: 'Tsukiji Outer Market',
                description: 'Famous food market.',
                thumbnailUrl: 'https://static01.nyt.com/images/2015/11/15/travel/15TOKYO1/15TOKYO1-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
                coordinates: { latitude: 35.6640, longitude: 139.7700 }
            }
        ]
    },
    {
        name: 'New York City, USA',
        description: 'The Big Apple, a global hub of culture, finance, and entertainment.',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        thumbnailUrl: 'https://media.architecturaldigest.com/photos/5da74823d599ec0008227ea8/16:9/w_2560%2Cc_limit/GettyImages-946087016.jpg', // Thumbnail URL for NYC
        spots: [
            {
                name: 'Statue of Liberty',
                description: 'Iconic symbol of freedom.',
                thumbnailUrl: 'https://www.travelguide.net/media/new-york.jpeg',
                coordinates: { latitude: 40.6892, longitude: -74.0445 }
            },
            {
                name: 'Central Park',
                description: 'Urban park in Manhattan.',
                thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg/800px-Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg',
                coordinates: { latitude: 40.7851, longitude: -73.9683 }
            },
            {
                name: 'Times Square',
                description: 'Famous intersection and entertainment hub.',
                thumbnailUrl: 'https://cdn.britannica.com/66/154566-050-36E73C15/Times-Square-New-York-City.jpg',
                coordinates: { latitude: 40.7580, longitude: -73.9855 }
            },
            {
                name: 'Empire State Building',
                description: 'Historic skyscraper.',
                thumbnailUrl: 'https://s1.citypass.net/_next/gcms/media/resize=fit:crop,width:700,height:567/quality=value:85/auto_image/compress/w9q9chRTsG57l19lvrYe',
                coordinates: { latitude: 40.748817, longitude: -73.985428 }
            },
            {
                name: 'Brooklyn Bridge',
                description: 'Historic bridge connecting Manhattan and Brooklyn.',
                thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Brooklyn_Bridge_Manhattan.jpg',
                coordinates: { latitude: 40.7061, longitude: -73.9969 }
            }
        ]
    },
    {
        name: 'Sydney, Australia',
        description: 'A vibrant city known for its stunning harbor and opera house.',
        coordinates: { latitude: -33.8688, longitude: 151.2093 },
        thumbnailUrl: 'https://www.telegraph.co.uk/content/dam/travel/Spark/singapore-airlines/sydney-harbour-aerial-view.jpg?imwidth=680', // Thumbnail URL for Sydney
        spots: [
            {
                name: 'Sydney Opera House',
                description: 'Iconic performing arts venue.',
                thumbnailUrl: 'https://cdn.asp.events/CLIENT_Oliver_K_15A4C8AE_5056_B739_54CFDE58102DEF33/sites/sydney-build-2024/media/libraries/sydney-build-blog/Sydney%20Opera%20House%20image.png',
                coordinates: { latitude: -33.8568, longitude: 151.2153 }
            },
            {
                name: 'Sydney Harbour Bridge',
                description: 'Famous bridge over the harbor.',
                thumbnailUrl: 'https://cdn.britannica.com/12/132412-050-18751073/Sydney-Harbour-Bridge-structure-Port-Jackson-New.jpg',
                coordinates: { latitude: -33.8486, longitude: 151.2100 }
            },
            {
                name: 'Bondi Beach',
                description: 'Popular beach destination.',
                thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Bondi_from_above.jpg',
                coordinates: { latitude: -33.8908, longitude: 151.2743 }
            },
            {
                name: 'Taronga Zoo',
                description: 'Zoo with a variety of animals.',
                thumbnailUrl: 'https://cdn-imgix.headout.com/media/images/a6efd30192d91f3f2a11116971d41893-1570-sydney-009-sydney--taronga-zoo-01.jpg',
                coordinates: { latitude: -33.8415, longitude: 151.2632 }
            },
            {
                name: 'Royal Botanic Garden',
                description: 'Beautiful garden with a view of the harbor.',
                thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Palm_House%2C_Royal_Botanic_Garden_Edinburgh.JPG',
                coordinates: { latitude: -33.8478, longitude: 151.2153 }
            }
        ]
    },
    {
        name: 'Rio de Janeiro, Brazil',
        description: 'Famous for its beaches, Carnival, and the statue of Christ the Redeemer.',
        coordinates: { latitude: -22.9068, longitude: -43.1729 },
        thumbnailUrl: 'https://cdn.britannica.com/03/94403-050-03683FB0/Rio-de-Janeiro-Braz.jpg', // Thumbnail URL for Rio
        spots: [
            {
                name: 'Christ the Redeemer',
                description: 'Famous statue overlooking the city.',
                thumbnailUrl: 'https://i.natgeofe.com/n/560b293d-80b2-4449-ad6c-036a249d46f8/rio-de-janeiro-travel_16x9.jpg',
                coordinates: { latitude: -22.9519, longitude: -43.2105 }
            },
            {
                name: 'Copacabana Beach',
                description: 'Famous beach known for its nightlife.',
                thumbnailUrl: 'https://images.squarespace-cdn.com/content/v1/63b42d68124e4755513cecb9/dbff2f86-381d-4de8-96d2-8d0fd29c64a8/copacabana-beach-waves.jpg',
                coordinates: { latitude: -22.9711, longitude: -43.1823 }
            },
            {
                name: 'Sugarloaf Mountain',
                description: 'Mountain with a panoramic view.',
                thumbnailUrl: 'https://turistafulltime.com/wp-content/uploads/2023/03/visit-sugarloaf-mountain-summit.jpg',
                coordinates: { latitude: -22.9494, longitude: -43.1562 }
            },
            {
                name: 'Tijuca National Park',
                description: 'Urban rainforest with hiking trails.',
                thumbnailUrl: 'https://www.globalnationalparks.com/wp-content/uploads/tijuca-national-park.jpg',
                coordinates: { latitude: -22.9482, longitude: -43.1927 }
            },
            {
                name: 'Selarón Steps',
                description: 'Famous colorful steps.',
                thumbnailUrl: 'https://freewalkertours.com/wp-content/uploads/Escalera-Selaron5.jpeg',
                coordinates: { latitude: -22.9000, longitude: -43.1887 }
            }
        ]
    }
];

// Function to seed data
async function seedData() {
    try {
        // Clear existing data
        await Location.deleteMany({});
        console.log('Cleared existing data');

        // Add each location with its spots
        for (const locationData of locationsData) {
            const location = new Location(locationData);
            await location.save();
            console.log(`Added location: ${location.name}`);
        }

        console.log('All sample data has been added successfully.');
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the function to seed data
seedData();
