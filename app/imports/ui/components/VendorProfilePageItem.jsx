import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';

const VendorProfilePageItem = ({ vendors }) => (
  <Col className="align-content-center text-center">
    <Row>
      <h2 id="vendor-name">{vendors.name}</h2>
    </Row>
    <Row>
      <h3 id="vendor-location">{vendors.location}</h3>
    </Row>
    <Row>
      <h3 id="vendor-hours">{vendors.hours}</h3>
    </Row>
    <Row className="justify-content-center">
      <Image id="vendor-gps" className="h-auto w-auto" src={vendors.gps} />
    </Row>
  </Col>
);

export default VendorProfilePageItem;

// Require a document to be passed to this component.
VendorProfilePageItem.propTypes = {
  vendors: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    gps: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
