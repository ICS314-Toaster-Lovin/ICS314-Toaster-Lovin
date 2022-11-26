import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Ingredient } from '../../api/ingredient/Ingredient';

function removeIngredient(id) {
  Ingredient.collection.remove(id);
}

const IngredientCard = ({ ingredient, showEditAndDelete, showFooter }) => (
  <Card className="h-100">
    <Card.Img src={ingredient.image} />
    <Card.Body>
      <Card.Title>{ingredient.name} ({ingredient.quantity})</Card.Title>
      <Card.Text>{(ingredient.price)}</Card.Text>
      {
        showEditAndDelete ?
          (
            <div className="d-flex justify-content-between align-items-end">
              <Card.Link href={`/edit-ingredient/${ingredient._id}`}>Edit</Card.Link>
              <Button variant="danger" onClick={() => removeIngredient(ingredient._id)}><Trash /></Button>
            </div>
          ) : null
      }
    </Card.Body>
    {
      showFooter ?
        (
          <Link to={`/publicVendorProfile/${ingredient.vendor}`}>
            <Card.Footer className="text-center">{ingredient.vendor}</Card.Footer>
          </Link>
        ) : null
    }
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
  showEditAndDelete: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool.isRequired,
};
