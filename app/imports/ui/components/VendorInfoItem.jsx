import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VendorInfoItem = ({ vendorInfo }) => (
  <tr>
    <td>{vendorInfo.name}</td>
    <td>{vendorInfo.location}</td>
    <td>{vendorInfo.gps}</td>
    <td>
      <Link to={`/edit/${vendorInfo._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
VendorInfoItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    gps: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default VendorInfoItem;
