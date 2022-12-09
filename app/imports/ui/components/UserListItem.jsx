import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UserListItem = ({ userlistitem, deleteItem }) => (
  <tr>
    <td>{userlistitem.email}</td>
    <td>{userlistitem.role}</td>
    <td><Link to={`/edit-user-list/${userlistitem._id}`} id="edituserlist-link">Edit</Link></td>
    <td><Button variant="danger" onClick={() => deleteItem(userlistitem._id)}>X</Button></td>
  </tr>
);

// Require a document to be passed to this component.
UserListItem.propTypes = {
  userlistitem: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default UserListItem;
