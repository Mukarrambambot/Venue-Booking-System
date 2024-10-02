const express = require('express'); 
const Booking = require('../models/Booking'); // Import the Booking model
const Venue = require('../models/Venue'); // Import the Venue model
const router = express.Router();

// Create a booking (this route might not be necessary since you're booking through /book-venue)
router.post('/book', async (req, res) => {
    const { hallName, bookingDate, bookingTime, userName, userContact } = req.body;

    const newBooking = new Booking({
        hallName,
        bookingDate,
        bookingTime,
        userName,
        userContact,
    });

    try {
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Book a venue
router.post('/book-venue', async (req, res) => {
    const { venueId, userName, userContact, bookingDate, bookingTime } = req.body; // Include all required fields

    try {
        const venue = await Venue.findById(venueId);
        // Check if the venue exists and is available
        if (!venue || venue.booked) {
            return res.status(404).json({ success: false, message: 'Venue not available.' });
        }

        // Create a new booking
        const newBooking = new Booking({
            hallName: venue.name, // Use the venue name
            bookingDate,
            bookingTime,
            userName,
            userContact,
        });

        await newBooking.save(); // Save the booking to the database

        // Update the venue to mark it as booked
        venue.booked = true;
        await venue.save(); // Save the updated venue

        res.json({ success: true, message: 'Venue booked successfully!' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error booking venue: ' + error.message });
    }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router; // Export the router
