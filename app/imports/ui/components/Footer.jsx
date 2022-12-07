import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-1 bg-light">
    <Container>
      <Row className="pb-3">
        <Col className="text-center">
          Resources:
          <hr />
          <a href="https://no-more-ramen.github.io/">
            Visit our Github Page
          </a>
          <br />
          <a href="https://github.com/no-more-ramen/no-more-ramen">
            Github Repository
          </a>
        </Col>
        <Col className="text-center">
          No More Ramen
          {' '}
          <hr />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          {' '}
        </Col>
        <Col className="text-center">
          Contact Us:
          <hr />
          no-more-ramen@foo.com
          <br />
          (808) 427-3142
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
