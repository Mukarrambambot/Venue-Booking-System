const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hallName: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userContact: {
        type: String,
        required: true,
    },
});

// Check if the model already exists, if not, create it
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
module.exports = Booking;
