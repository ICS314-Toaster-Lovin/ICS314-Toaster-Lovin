import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const HomeRecipeItem = ({ home }) => (
  <tr>
    <td>{home.name}</td>
    <td>{home.image}</td>
    <td>
      <Link to={`/edit/${home._id}`}>View</Link>
    </td>
  </tr>
);

const HomeIngredientItem = ({ ingredient }) => (
  <tr>
    <td>{ingredient.name}</td>
    <td>{ingredient.price}</td>
    <td>{ingredient.vendor}</td>
    <td>
      <Link to={`/edit/${ingredient._id}`}>View</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
HomeRecipeItem.propTypes = {
  home: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

HomeIngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    vendor: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export {
  HomeRecipeItem,
  HomeIngredientItem,
};
