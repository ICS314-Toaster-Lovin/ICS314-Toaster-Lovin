import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the Student Ingredient table. See pages/StudentProfile.jsx. */
const StudentRecipeItem = ({ ingredient }) => (
  <tr>
    <td>{ingredient.name}</td>
    <td>{ingredient.quantity}</td>
  </tr>
);

// Require a document to be passed to this component.
StudentRecipeItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudentRecipeItem;
