import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const HomeRecipeItem = ({ recipe }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={recipe.image} />
    </Card.Header>
    <Card.Body>
      <Card.Text>{recipe.name}</Card.Text>
    </Card.Body>
  </Card>
);

const HomeIngredientItem = ({ ingredient }) => (
  <Card className="h-50">
    <Card.Header>
      <Card.Text>{ingredient.name} {ingredient.price}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{ingredient.vendor}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
HomeRecipeItem.propTypes = {
  recipe: PropTypes.shape({
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
