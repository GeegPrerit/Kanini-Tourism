import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import destination1 from './img/destination1.jpg'
import destination2 from './img/destination2.jpg'
import destination3 from './img/destination3.jpg'
import Carousel1 from './img/Carousel1.jpg'
import Carousel2 from './img/Carousel2.jpg'
import Carousel3 from './img/Carousel3.jpg'
import Carousel4 from './img/Carousel4.jpg'
import Feedback from './feedback'

const destinations = [
  {
    id: 1,
    name: 'Destination 1',
    image: destination1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Destination 2',
    image: destination2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Destination 3',
    image: destination3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Destination 3',
    image: destination3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Destination 3',
    image: destination3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }
];

const CarouselInfo  = [
  {
    id: 1,
    name: 'Destination 1',
    image: Carousel1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Destination 2',
    image: Carousel2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Destination 3',
    image: Carousel3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    name: 'Destination 4',
    image: Carousel4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]
const Home = () => {
  return (
    <>
      
        <div className="row">
          <div className="">
            <h1>Welcome to Our Beautiful Destinations!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac est nec nunc interdum elementum et eu
              libero. Suspendisse potenti. Nunc tristique lorem quis bibendum fringilla.
            </p>
          </div>
        </div>

         <div className="row">
        <div className="col-md-12">
          <Carousel interval={1100} pauseOnHover={false}>
            {CarouselInfo.map((destination) => (
              <Carousel.Item key={destination.id}>
                <img className="d-block w-100" src={destination.image} alt={destination.name} />
                <Carousel.Caption>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <Button variant="primary">Learn More</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>



        <div className="row mt-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="col-md-4 mb-4">
              <Card>
                <Card.Img variant="top" src={destination.image} alt={destination.name} />
                <Card.Body>
                  <Card.Title>{destination.name}</Card.Title>
                  <Card.Text>{destination.description}</Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      <Feedback></Feedback>
    </>
  );
};

export default Home;
