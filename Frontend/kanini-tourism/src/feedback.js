import React, { useEffect, useState } from 'react';
import {Card,Row,Col} from 'react-bootstrap';

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        fetchAgents();
    }, []);
    const fetchAgents = async () => {
        try {
            const response = await fetch("https://localhost:7194/Feedback");
            if (response.ok) {
                const data = await response.json();
                setFeedback(data);

                console.log("feedback from gateway", feedback);

            } else {
                console.error("Error fetching agents:", response.statusText);
                window.alert("Unauthorized");
            }
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };
    return (
        <div>
            <h3>Feedback from our happy customers</h3>
            <Row>
                {feedback.map((feed, index) => (
                    <Col key={feed.feedId} md={6} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>Comments:</Card.Title>
                                <Card.Text>{feed.feedbackText}</Card.Text>
                                <Card.Text>Rating: {feed.rating}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
};

export default Feedback;
