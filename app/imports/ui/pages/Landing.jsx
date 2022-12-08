import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id="landing-page">
    <Carousel variant="light">
      <Carousel.Item>
        <img
          id="img"
          className="img-fluid w-100"
          style={{ height: '75vh' }}
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          alt="First slide"
        />
        <div id="caption">
          <Carousel.Caption>
            <p style={{ backgroundColor: 'green', border: '2px solid black' }} className="rounded">
              The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.
            </p>
            <Button className="justify-content-center" href="/signup">Sign Up Today</Button>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="img"
          className="img-fluid w-100"
          style={{ height: '75vh' }}
          src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Second slide"
        />
        <div id="caption">
          <Carousel.Caption>
            <p style={{ backgroundColor: 'green', border: '2px solid black' }} className="rounded">
              The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.
            </p>
            <Button className="justify-content-center" href="/signup">Sign Up Today</Button>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="img"
          className="img-fluid w-100"
          style={{ height: '75vh' }}
          src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Third slide"
        />
        <div id="caption">
          <Carousel.Caption>
            <p style={{ backgroundColor: 'green', border: '2px solid black' }} className="rounded">
              The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.
            </p>
            <Button className="justify-content-center" href="/signup">Sign Up Today</Button>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Landing;
