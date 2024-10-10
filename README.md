Overview
This README provides an overview of the Activity, Location, and User models used in this application. These models are built using Mongoose, a popular MongoDB object modeling library for Node.js.

Models
Activity Model
The Activity model represents an activity associated with a specific location and spot. It includes the following fields:

name: (String, required) The name of the activity.
spotId: (ObjectId, required) A reference to the Spot model, indicating the spot where the activity takes place.
locationId: (ObjectId, required) A reference to the Location model, indicating the location of the activity.
notes: (String, optional) Additional notes about the activity, with a maximum length of 500 characters.
duration: (Number, optional) The duration of the activity, which must be a positive number.
thumbnailUrl: (String, optional) A URL pointing to a thumbnail image representing the activity.
Location Model
The Location model represents a geographical location that can contain multiple spots. It includes the following fields:

name: (String, required) The name of the location.
description: (String, required) A description of the location, with a maximum length of 500 characters.
thumbnailUrl: (String, required) A URL pointing to a thumbnail image representing the location.
coordinates: (Object, optional) Contains latitude and longitude values for the location:
latitude: (Number) Latitude value, must be between -90 and 90.
longitude: (Number) Longitude value, must be between -180 and 180.
spots: (Array of SpotSchema) An array containing spots associated with the location.
User Model
The User model represents a user in the application. Its schema can be expanded based on the application's requirements.
Dependencies
Make sure you have the following dependencies in your project:

mongoose
License
This project is licensed under the MIT License. See the LICENSE file for more details.

