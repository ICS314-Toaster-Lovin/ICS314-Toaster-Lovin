import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';
import IngredientCard from '../components/IngredientCard';

const VendorHome = () => {
  // Make sure data is ready before getting the username
  let user;
  Tracker.autorun(() => {
    if (Accounts.loginServicesConfigured()) {
      user = Meteor.user().username;
    }
  });

  const { ready, ingredients } = useTracker(() => {
    const ingredientSubscription = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = ingredientSubscription.ready();
    // Get the ingredient collection
    const ingredientItems = Ingredient.collection.find({ owner: user }).fetch();
    return {
      ready: rdy,
      ingredients: ingredientItems,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id="vendor-home-page">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Your Items</h2>
        </Col>
      </Row>
      <Row md={5}>
        {
          ingredients.map(ing => (
            <Col key={ing._id} className="mb-3">
              <IngredientCard ingredient={ing} showEditAndDelete showFooter={false} />
            </Col>
          ))
        }
        <Col className="mb-3">
          <Link to="/add-ingredients" className="text-decoration-none">
            <Card className="h-100 text-center" bg="light">
              <Card.Body>
                <PlusCircleFill size="70%" height="150px" className="text-primary my-5" />
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
