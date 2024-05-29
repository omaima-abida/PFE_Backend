const mongoose = require('mongoose');

// Define the Review schema
const reviewSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Assuming you have a Property model
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;
