const mongoose = require('mongoose');

// Import required modules

// Define the Flight schema
const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    }
});

// Create the Flight model
const Flight = mongoose.model('Flight', flightSchema);

// Export the Flight model
module.exports = Flight;