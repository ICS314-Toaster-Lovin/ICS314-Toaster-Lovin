import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const IngredientCard = ({ ingredient }) => {
  return (
    <Card className="h-100">
      <Card.Img src={ingredient.image} />
      <Card.Body>
        <Card.Title>{ingredient.name} ({ingredient.stock})</Card.Title>
        <Card.Text>${(ingredient.price.toFixed(2))} / {ingredient.units}</Card.Text>
        <Card.Link href="#">Edit</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default IngredientCard;

// Require a document to be passed to this component.
IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.number,
    units: PropTypes.string,
    image: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};
