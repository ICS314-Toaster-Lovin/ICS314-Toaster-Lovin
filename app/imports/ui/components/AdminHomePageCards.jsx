import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';

/** Renders recipe cards on the user home page */
const HomeRecipeItem = ({ homerecipeitem }) => (
  <Link to={`/edit-recipe/${homerecipeitem._id}`} className="text-decoration-none text-black">
    <Card style={{ width: '95%' }}>
      <Card.Img style={{ objectFit: 'cover', height: '8vw' }} variant="top" src={homerecipeitem.image} />
      <Card.Body>
        <Card.Title style={{ margin: '-5px', size: '8vw' }}>{homerecipeitem.name}</Card.Title>
      </Card.Body>
    </Card>
  </Link>
);

const HomeIngredientItem = ({ homeingredientitem }) => (
  <Card style={{ width: '95%' }}>
    <Link to={`/edit-ingredient/${homeingredientitem._id}`} className="text-decoration-none text-black">
      <Card.Header>
        <Card.Text>{homeingredientitem.name} {homeingredientitem.price}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Col style={{ width: '70%' }}>
          <Card.Text>{homeingredientitem.vendor}
          </Card.Text>
        </Col>
      </Card.Body>
    </Link>
  </Card>

);

const UserList = ({ userlist }) => (
  <Card className="p-0 border-0 ms-1">
    <Card.Body>
      <Row style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
        <Col className="ps-1 pe-0 pt-0">
          <Card.Text>{userlist.email}</Card.Text>
        </Col>
        <Col>
          <Card.Text>Role: {userlist.role}</Card.Text>
        </Col>
      </Row>
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
    _id: PropTypes.string,
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
    _id: PropTypes.string,
  }).isRequired,
};

UserList.propTypes = {
  userlist: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export {
  HomeRecipeItem,
  HomeIngredientItem,
  UserList,
};
