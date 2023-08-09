import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Galary = () => {
  useEffect(() => {
    fetchPlans();
  }, []);

  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await fetch("https://localhost:7023/api/ImageGalleryControler");
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      } else {
        console.error("Error fetching agents:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  return (
    <>
      <h3 className="text-center mt-3 mb-4">Image Galary</h3>
      <Row>
        {plans.map((plan, index) => (
          <Col key={plan.planId} sm={6} md={4} lg={3}>
            <Card className="mb-3">
              <Card.Img variant="top" src={`data:image/jpeg;base64,${plan.image}`}style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{plan.imageTitle}</Card.Title>
                <Card.Text>{plan.planDescription}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Galary;
