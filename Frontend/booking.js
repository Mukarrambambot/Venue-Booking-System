// Function to book a venue using fetch
const bookVenue = async (venueId) => {
    try {
        const response = await fetch('/api/book-venue', { // Use the correct endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ venueId }),
        });

        const data = await response.json(); // Assuming the response is JSON
        if (data.success) {
            alert('Venue booked successfully!');
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error booking venue:', error);
        alert('There was an error booking the venue.');
    }
};

// Handle form submission for booking
document.getElementById('bookingForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    const venueId = document.getElementById('venueId').value; // Get the venue ID
    bookVenue(venueId); // Call the booking function
});
const loadVenues = async () => {
    try {
        const response = await fetch('/venues');
        const venues = await response.json();
        const venueList = document.getElementById('venueList');
        venueList.innerHTML = ''; // Clear the existing list
        venues.forEach(venue => {
            const option = document.createElement('option');
            option.value = venue._id; // Assuming _id is the unique identifier
            option.textContent = `${venue.name} (Capacity: ${venue.capacity})`;
            venueList.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading venues:', error);
    }
};

document.addEventListener('DOMContentLoaded', loadVenues); // Load venues on page load
