import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const IngredientCard = ({ ingredient }) => (
  <Card className="h-100">
    <Card.Img src={ingredient.image} />
    <Card.Body>
      <Card.Title>{ingredient.name} ({ingredient.quantity})</Card.Title>
      <Card.Text>{(ingredient.price)} / {ingredient.units}</Card.Text>
      <Card.Link href="#">Edit</Card.Link>
    </Card.Body>
  </Card>
);

export default IngredientCard;

// Require a document to be passed to this component.
IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    units: PropTypes.string,
    image: PropTypes.string,
    vendor: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
