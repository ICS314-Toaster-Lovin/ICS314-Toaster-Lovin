import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const displayRestrictions = (student) => {
  const results = [];
  if (student.glutenFree) { results.push('Gluten Free'); }
  if (student.lactoseFree) { results.push('Lactose Free'); }
  if (student.vegan) { results.push('Vegan'); }
  if (student.vegetarian) { results.push('Vegetarian'); }

  return results;
};

/** Renders general Student information */
const StudentInfoItem = ({ student }) => (
  <Col className="align-content-center text-center">
    <Row>
      <h2>{student.name}</h2>
    </Row>
    <Row>
      <h3>Dietary Restrictions: {displayRestrictions(student).map((restriction) => `[${restriction}]`)}</h3>
    </Row>
    <Row>
      <h4><Link to={`/edit-student-profile/${student._id}`} id="edit-student-profile-link">Edit</Link></h4>
    </Row>
  </Col>
);

/** Renders a card for Student Recipe. */
const StudentRecipeItem = ({ recipe }) => (
  <Link to={`/recipe/${recipe._id}`} className="text-decoration-none">
    <Card style={{ width: '95%' }}>
      <Card.Img style={{ objectFit: 'cover', height: '8vw' }} variant="top" src={recipe.image} />
      <Card.Body className="text-black">{recipe.name}</Card.Body>
    </Card>
  </Link>
);

// Require a document to be passed to this component.
StudentInfoItem.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string,
    glutenFree: PropTypes.bool,
    lactoseFree: PropTypes.bool,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

StudentRecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export {
  StudentInfoItem,
  StudentRecipeItem,
};
