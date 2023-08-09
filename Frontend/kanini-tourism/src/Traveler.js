import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FeedbackInsert from './FeedbackInsert';
import jwt_decode from 'jwt-decode';

const Traveler = () => {
  const [bookingData, setBookingData] = useState([]);
  const [showBookingCard, setShowBookingCard] = useState(false);

  const fetchBookingData = async () => {
    try {
      // Replace 'your_token_here' with the actual token you have
      const token = localStorage.getItem('jwttoken');
      const decodedToken = jwt_decode(token); // Import 'jwt_decode' function
      const userId = decodedToken.UserId; // Assuming the token has a 'userId' field
      const response = await fetch(`https://localhost:7023/api/BookingDetails/booking/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setBookingData(data);
        console.log(bookingData);
      } else {
        toast.error("Error fetching booking data");
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const toggleBookingCard = () => {
    setShowBookingCard(!showBookingCard);
  };

  return (
    <>
      <FeedbackInsert />
      <Button
        className="mt-4"
        variant="primary"
        onClick={() => {
          toggleBookingCard();
          fetchBookingData(); // Fetch data when the button is clicked
        }}
      >
        {showBookingCard ? 'Hide Available Bookings' : 'Show Available Bookings'}
      </Button>

      {showBookingCard && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Booking Information</Card.Title>
            {bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <div key={booking.bookingId}>
                  <Card.Text>Traveler Name: {booking.travelerName}</Card.Text>
                  <Card.Text>Starting Date: {booking.startDate}</Card.Text>
                  <Card.Text>End Date: {booking.endDate}</Card.Text>
                  <Card.Text>Email: {booking.email}</Card.Text>
                  <Card.Text>Mobile: {booking.mobileNumber}</Card.Text>
                </div>
              ))
            ) : (
              <Card.Text>No bookings found. You have not booked any trips yet.</Card.Text>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Traveler;
