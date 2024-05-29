const mongoose = require('mongoose');

// Define the FlightTicket schema
const flightTicketSchema = new mongoose.Schema({
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    ticketNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked'
    }
});

// Create the FlightTicket model
const FlightTicket = mongoose.model('FlightTicket', flightTicketSchema);

// Export the FlightTicket model
module.exports = FlightTicket;