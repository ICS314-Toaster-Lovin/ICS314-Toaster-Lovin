import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Recipe } from '../../api/recipe/Recipe';
import StudentIngredientItem from '../components/StudentIngredientItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, ingredients, recipes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const studentIngredientItems = Ingredient.collection.find({}).fetch();
    const studentRecipeItems = Recipe.collection.find({}).fetch();
    return {
      ingredients: studentIngredientItems,
      recipes: studentRecipeItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h1>Name</h1>
            <h2>Dietary Restrictions</h2>
          </Col>
        </Col>
        <Row>
          <Col>
            <h3>Recipes</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient) => <StudentIngredientItem key={ingredient._id} stuff={ingredient} />)}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h3>Ingredients</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((ingredient) => <StudentRecipeItem key={ingredient._id} stuff={ingredient} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentProfile;
