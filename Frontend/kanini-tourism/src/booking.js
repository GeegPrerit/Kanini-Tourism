import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from React Bootstrap
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MyDynamicPDF from './pdf';
import './css/booking.css'
const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planId = new URLSearchParams(location.search).get('id');

  const [plans, setPlans] = useState([]);

  // Now you have the planId and can use it for further processing
  useEffect(() => {
    checkLogin();
    fetchPlans();
  }, []);
  const [travelerName, setTravellerName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobile] = useState('');
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [userId, setTravelerId] = useState('');
  const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleTravellerNameChange = (event) => {
    setTravellerName(event.target.value);
  };
  const handleSelectedPlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMobileNumberChange = (event) => {
    setMobile(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStart(event.target.value);
  };
  const handleEndingDateChange = (event) => {
    setEnd(event.target.value);
  };

  const checkLogin = () => {
    const token = localStorage.getItem('jwttoken');
    if (!token) {
      // If token is not found, redirect to login
      toast.error("Your are not logged in ")
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      const role =
        decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      // If token is found, decode it to get user information      
      if (token && role !== 'Traveler') {
        // If the role is not "traveler", redirect to login
        toast.error("You have been logged out");
        toast.warning(`You are not a traveler.\nTour can be booked by Traveler Only`)

        navigate('/Login');
        localStorage.removeItem('jwttoken');

      } else {
        // If the role is "traveler", fetch plans
        fetchPlans();
      }
    }
  }
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {

    setShowModal(false);

  };

  const handleModalOpen = () => {
    setShowModal(true);
  };
  console.log(plans);
  const fetchPlans = async () => {
    try {
      const response = await fetch(`https://localhost:7023/api/TravelDetails/${planId}`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
        console.log(plans);
      } else {
        console.error("Error fetching agents:", response.statusText);
        //window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };


  const handleBooking = async () => {
    const accessToken = localStorage.getItem('jwttoken'); // Replace this with your actual access token
    const decodedToken = jwt_decode(accessToken);
    const userid = decodedToken.UserId;
    console.log("userId", userid);
    setTravelerId(userid);

    if (travelerName && email && mobileNumber && startDate && endDate) {
      const bookingDetails = {
        travelerName,
        selectedPlan,
        email,
        mobileNumber,
        startDate,
        endDate,
      };
      try {
        const response = await fetch('https://localhost:7023/api/BookingDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            travelerName,
            selectedPlan,
            email,
            mobileNumber,
            startDate,
            endDate,
            tripId: plans.planId,
            userId: userid
          }),
        });


        if (response.ok) {
          const data = await response.json();
          const bookingId = data.bookingId; // Assuming the response contains the booking ID
          console.log(bookingId);
          console.log('Response:', data);

          setBookingData(bookingDetails);
          console.log("details that is getting transfered", bookingData)
          setTravellerName('');
          setSelectedPlan('');
          setEmail('');
          setMobile('');
          setStart('');
          setEnd('');
          setRequiredFieldsFilled(true);
          navigate(`/payment?bookingId=${bookingId}`);
          //fetchUsers(); // Refresh the user list after successful signup
        } else {
          toast.error("Error In Booking Tour");
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      toast.warning("All fields are required");
    }
  }
  const productData = {
    id: 1,
    name: 'Sample Product',
    description: 'This is a sample product description. Replace this with the actual product description.',
    price: '$19.99',
    imageUrl: 'https://via.placeholder.com/300',
  };



  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6">
            <img src={`data:image/jpeg;base64,${plans.planImage}`} alt={productData.name} className="img-fluid rounded-left" />
          </div>
          <div className="col-lg-6">
            <h2>{plans.planTitle}</h2>
            <p>Plan Description: {plans.planDescription}</p>
            <p>Price: ₹ {plans.planPrice}</p>
            <p>Location: {plans.location}</p>
            <p>Country: {plans.country}</p>
            <p>Plan for No. of People: {plans.persons}</p>
            <p>Itenary Covered: {plans.itenary}</p>
            {/* <p>{plans.duration}</p> */}
            <div className="info">
              <button className="btn btn-primary" onClick={handleModalOpen}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add input fields here for the user to enter booking details */}
          <div className="form-group">
            <label htmlFor="name">Traveller Name</label>
            <input type="text" className="form-control" value={travelerName} onChange={handleTravellerNameChange} id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>{/* auto fetched*/}
            <input type="email" className="form-control" value={email} onChange={handleEmailChange} id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Mobile Number</label>{/* auto fetched*/}
            <input type="number" className="form-control" value={mobileNumber} onChange={handleMobileNumberChange} id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Starting Date</label>
            <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Ending Date</label>
            <input type="date" className="form-control" value={endDate} onChange={handleEndingDateChange} id="email" required />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button variant="primary" onClick={() => { handleBooking(); }}>
            Proceed To Pay
          </Button>

        </Modal.Footer>
      </Modal>
      {bookingData && <MyDynamicPDF booking={bookingData} />}

    </>

  );
}

export default Booking;

