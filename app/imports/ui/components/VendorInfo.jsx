import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';

const VendorInfo = ({ vendors }) => (
  <Col className="align-content-center text-center">
    <Row>
      <h2>{vendors.name}</h2>
    </Row>
    <Row>
      <h3>{vendors.location}</h3>
    </Row>
    <Row>
      <h3>{vendors.hours}</h3>
    </Row>
    <Row>
      <Image src={vendors.gps} />
    </Row>
  </Col>
);

export default VendorInfo;

// Require a document to be passed to this component.
VendorInfo.propTypes = {
  vendors: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    gps: PropTypes.string
  }).isRequired,
};
