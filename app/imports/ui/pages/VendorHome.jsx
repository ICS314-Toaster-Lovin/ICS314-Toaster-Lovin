import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';
import IngredientCard from '../components/IngredientCard';

const VendorHome = () => {
  const { ready, ingredients } = useTracker(() => {
    const ingredientSubscription = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = ingredientSubscription.ready();
    // Get the ingredient collection
    const ingredientItems = Ingredient.collection.find({}).fetch();
    return {
      ready: rdy,
      ingredients: ingredientItems,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Your Items</h2>
        </Col>
      </Row>
      <Row md={5}>
        {
          ingredients.map(ing => (
            <Col className="mb-3">
              <IngredientCard ingredient={ing} />
            </Col>
          ))
        }
        <Col className="mb-3">
          <Link to="/add-ingredients" className="text-decoration-none">
            <Card className="h-100 text-center" bg="light">
              <Card.Body>
                <PlusCircleFill size="md" height="150px" className="text-primary my-5" />
                <Card.Title className="text-black">Add a New Ingredient</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorHome;
