import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row className="pb-3">
        <Col className="text-center">
          <br />
          <br />
          <a href="https://no-more-ramen.github.io/">
            Github Repository
          </a>
        </Col>
        <Col className="text-center">
          Resources:
          <br />
          <br />
          <a href="https://no-more-ramen.github.io/">
            Visit our Github Page
          </a>
        </Col>
        <Col className="text-center">
          <br />
          <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
            Template Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
