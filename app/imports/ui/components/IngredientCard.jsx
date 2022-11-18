import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Ingredient } from '../../api/ingredient/Ingredient';

function removeIngredient(id) {
  Ingredient.collection.remove(id);
}

const IngredientCard = ({ ingredient }) => (
  <Card className="h-100">
    <Card.Img src={ingredient.image} />
    <Card.Body>
      <Card.Title>{ingredient.name} ({ingredient.quantity})</Card.Title>
      <Card.Text>{(ingredient.price)}</Card.Text>
      <div className="d-flex justify-content-between">
        <Card.Link href={`/edit/${ingredient._id}`}>Edit</Card.Link>
        <Button variant="danger" onClick={() => removeIngredient(ingredient._id)}><Trash /></Button>
      </div>
    </Card.Body>
  </Card>
);

export default IngredientCard;

// Require a document to be passed to this component.
IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    units: PropTypes.string,
    image: PropTypes.string,
    vendor: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
