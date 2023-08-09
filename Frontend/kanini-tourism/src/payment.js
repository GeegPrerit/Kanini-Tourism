import React, { useState, useEffect } from 'react';
import MyDynamicPDF from './pdf';
import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './css/payment.css'
import { toast, ToastContainer } from 'react-toastify';
const Payment = () => {
    const [showPDF, setShowPDF] = useState(false);
    // const [userFormData, setUserFormData] = useState(null); // State to store user-entered data
    const [dataFetched, setDataFetched] = useState(false);
    const [booking, setBooking] = useState([]); // State to track if data is fetched

 

    const [paymentOption, setPaymentOption] = useState('card');

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle payment processing logic here based on the selected payment option
        console.log('Payment option selected:', paymentOption);
        setTimeout(() => {
            toast.success('Payment done and booking confirmed');
            setShowPDF(true);
        }, 2000);
    };
    const location = useLocation();
    const bookingId = new URLSearchParams(location.search).get('bookingId');

    const fetchBooking = async () => {
        try {
            const response = await fetch(`https://localhost:7023/api/BookingDetails/${bookingId}`);
            if (response.ok) {
                const data = await response.json();
                setBooking(data);
            } else {
                console.error("Error fetching agents:", response.statusText);
                window.alert("Unauthorized");
            }
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };
    useEffect(() => {
        fetchBooking();
    }, []);
    
    console.log("details fetched",booking);
    useEffect(() => {
        if (dataFetched) {
            setShowPDF(true); // Show the PDF once the data is fetched
        }
    }, [dataFetched]);
    return (
        <>
            <div className='box'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mt-4">Payment Page</h2>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Payment Option</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Card"
                                    name="paymentOption"
                                    value="card"
                                    checked={paymentOption === 'card'}
                                    onChange={handlePaymentOptionChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="E-wallet"
                                    name="paymentOption"
                                    value="ewallet"
                                    checked={paymentOption === 'ewallet'}
                                    onChange={handlePaymentOptionChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="UPI"
                                    name="paymentOption"
                                    value="upi"
                                    checked={paymentOption === 'upi'}
                                    onChange={handlePaymentOptionChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Netbanking"
                                    name="paymentOption"
                                    value="netbanking"
                                    checked={paymentOption === 'netbanking'}
                                    onChange={handlePaymentOptionChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter card number" />
                            </Form.Group>

                            {paymentOption === 'card' && (
                                <Form.Group controlId="formCardHolder">
                                    <Form.Label>Card Holder</Form.Label>
                                    <Form.Control type="text" placeholder="Enter card holder name" />
                                </Form.Group>
                            )}

                            {paymentOption === 'card' && (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formExpiryDate">
                                            <Form.Label>Expiry Date</Form.Label>
                                            <Form.Control type="text" placeholder="MM/YY" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formCVC">
                                            <Form.Label>CVC</Form.Label>
                                            <Form.Control type="text" placeholder="CVC" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}

                            <Button variant="primary" type="submit" block className="mt-4">
                                Pay Now
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
            <div>
                {showPDF && (
                    <PDFViewer style={{ width: '100%', height: '500px' }}>
                        <MyDynamicPDF booking={booking} />
                    </PDFViewer>
                )}
            </div>
        </>
    );
};

export default Payment;
