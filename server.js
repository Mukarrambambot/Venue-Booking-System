const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Venue = require('./models/Venue'); // Import the Venue model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('Frontend')); // Serve static files

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/venue-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Route to view available venues
app.get('/venues', async (req, res) => {
    try {
        const venues = await Venue.find({ booked: false });
        res.json(venues);
    } catch (error) {
        res.status(500).send('Error retrieving venues');
    }
});

// Route to book a venue
app.post('/book', async (req, res) => {
    const { venueId } = req.body;
    try {
        const updatedVenue = await Venue.findByIdAndUpdate(venueId, { booked: true }, { new: true });
        if (updatedVenue) {
            res.send('Venue booked successfully');
        } else {
            res.status(404).send('Venue not found');
        }
    } catch (error) {
        res.status(500).send('Error booking venue');
    }
});

// Route to check booking status
app.get('/booking-status/:venueId', async (req, res) => {
    const { venueId } = req.params;
    try {
        const venue = await Venue.findById(venueId);
        if (venue) {
            res.send(`Venue is ${venue.booked ? 'booked' : 'available'}`);
        } else {
            res.status(404).send('Venue not found');
        }
    } catch (error) {
        res.status(500).send('Error checking booking status');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
