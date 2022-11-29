import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserListItem = ({ userlistitem }) => (
  <tr>
    <td>{userlistitem.email}</td>
    <td>{userlistitem.role}</td>
    <td>Edit</td>
  </tr>
);

// Require a document to be passed to this component.
UserListItem.propTypes = {
  userlistitem: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default UserListItem;
