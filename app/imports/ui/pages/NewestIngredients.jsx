import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';
import NewestIngredientItem from '../components/NewestIngredientItem';

const NewestIngredients = () => {

  const { ready, ingredients } = useTracker(() => {
    const ingredientSubscription = Meteor.subscribe(Ingredient.adminPublicationName);
    const rdy = ingredientSubscription.ready();
    const ingredientList = Ingredient.collection.find({}).fetch();
    // Sort the list by most recent date
    ingredientList.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return db - da;
    });

    return {
      ready: rdy,
      ingredients: ingredientList,
    };
  }, []);

  const deleteItem = (id) => {
    Ingredient.collection.remove(id, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Ingredient Deleted', 'success')));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Ingredients</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>Name</th>
                <th>Vendor</th>
                <th>Owner</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => <NewestIngredientItem key={ingredient._id} ingredient={ingredient} deleteItem={deleteItem} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default NewestIngredients;
