import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const HomeRecipeItem = ({ homerecipeitem }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={homerecipeitem.image} />
    </Card.Header>
    <Card.Body>
      <Card.Text>{homerecipeitem.name}</Card.Text>
    </Card.Body>
  </Card>
);

const HomeIngredientItem = ({ homeingredientitem }) => (
  <Card className="h-50">
    <Card.Header>
      <Card.Text>{homeingredientitem.name} {homeingredientitem.price}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{homeingredientitem.vendor}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
HomeRecipeItem.propTypes = {
  homerecipeitem: PropTypes.shape({
    name: PropTypes.string,
    servingSize: PropTypes.number,
    estimatedTime: PropTypes.string,
    glutenFree: PropTypes.bool,
    lactoseFree: PropTypes.bool,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    image: PropTypes.string,
    ingredientList: PropTypes.string,
    instructions: PropTypes.string,
  }).isRequired,
};

HomeIngredientItem.propTypes = {
  homeingredientitem: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    vendor: PropTypes.string,
  }).isRequired,
};

export {
  HomeRecipeItem,
  HomeIngredientItem,
};
