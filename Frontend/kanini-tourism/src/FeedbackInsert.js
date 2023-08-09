import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const FeedbackInsert = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState('');

    const handleFeedbackText = (event) => {
        setFeedbackText(event.target.value);
    };
    const handleFeedbackRating = (event) => {
        setRating(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Name:', feedbackText);
        console.log('Email:', rating);

        if (feedbackText && rating) {
            try {
                const response = await fetch('https://localhost:7069/api/Feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        feedbackText,
                        rating
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Response:', data);
                    setFeedbackText('');
                    setRating('');
                } else {
                    toast.error("Error In Adding Feedback");
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            toast.warning("All fields are required");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Feedback Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Feedback Text</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Feedback Text"
                        value={feedbackText}
                        onChange={handleFeedbackText}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="feedback">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Rating"
                        value={rating}
                        onChange={handleFeedbackRating}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default FeedbackInsert;
