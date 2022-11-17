import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

/** Renders recipe cards on the user home page */
const HomeRecipeItem = ({ homerecipeitem }) => (
  <Card style={{ width: '95%' }}>
    <Card.Img style={{ objectFit: 'cover', height: '8vw' }} variant="top" src={homerecipeitem.image} />
    <Card.Body>
      <Card.Title style={{ margin: '-5px', size: '8vw' }}>{homerecipeitem.name}</Card.Title>
    </Card.Body>
  </Card>
);

const HomeIngredientItem = ({ homeingredientitem }) => (
  <Card style={{ width: '95%' }}>
    <Card.Header>
      <Card.Text>{homeingredientitem.name} {homeingredientitem.price}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{homeingredientitem.vendor}</Card.Text>
    </Card.Body>
  </Card>
);

const UserList = ({ userlist }) => (
  <Card>
    <Card.Header>
      <Card.Text>User List</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Title>{userlist.email} {userlist.role} </Card.Title>
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
    quantity: PropTypes.number,
    units: PropTypes.string,
    image: PropTypes.string,
    vendor: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

UserList.propTypes = {
  userlist: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export {
  HomeRecipeItem,
  HomeIngredientItem,
  UserList,
};
