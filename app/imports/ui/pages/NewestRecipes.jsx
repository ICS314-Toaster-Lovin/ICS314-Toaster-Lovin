import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Recipe } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';
import NewestRecipeItem from '../components/NewestRecipeItem';

const NewestRecipes = () => {

  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipe.adminPublicationName);
    const rdy = subscription.ready();
    const recipeItems = Recipe.collection.find({}).fetch();
    // Sort the list by most recent date
    recipeItems.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return db - da;
    });

    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  const deleteItem = (id) => {
    Recipe.collection.remove(id, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Recipe Deleted', 'success')));
  };

  return (ready ? (
    <Container id="newest-recipes-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Recipes</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => <NewestRecipeItem key={recipe._id} recipe={recipe} deleteItem={deleteItem} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default NewestRecipes;
