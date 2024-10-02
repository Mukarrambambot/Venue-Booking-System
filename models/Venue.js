// models/Venue.js
const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: String,
    capacity: Number,
    booked: { type: Boolean, default: false }
});

// Check if the model is already defined
const Venue = mongoose.models.Venue || mongoose.model('Venue', venueSchema);

module.exports = Venue;
