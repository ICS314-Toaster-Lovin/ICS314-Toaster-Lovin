import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/recipe/Recipe';
import { HomeIngredientItem, HomeRecipeItem } from '../components/StudentHomePageItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Students } from '../../api/student/Student';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentHome = () => {
  const { ready, student, recipes, ingredients } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipe.userPublicationName);
    const subscription2 = Meteor.subscribe(Ingredient.userPublicationName);
    const userSubscription = Meteor.subscribe(Students.userPublicationName);
    const rdy = subscription.ready() && subscription2.ready() && userSubscription.ready();

    // Get the Recipe documents
    const recipeItems = Recipe.collection.find({}).fetch();
    const ingredientItems = Ingredient.collection.find({}).fetch();
    const studentProfile = Students.collection.find({}).fetch();
    return {
      ingredients: ingredientItems,
      recipes: recipeItems,
      student: studentProfile[0],
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row>
        <h2 className="mt-2">Favorite Recipe</h2>
      </Row>
      <Row className="d-flex flex-row flex-nowrap row-horizon overflow-auto">
        {!student.favorites.includes('null')
          ? recipes.filter((recipe) => student.favorites.includes(recipe._id)).map((homerecipeitem, index) => (<Col className="col-sm-3" key={index}><HomeRecipeItem homerecipeitem={homerecipeitem} /></Col>))
          : <p>You currently have no favorites.</p>}
      </Row>
      <Row>
        <h2 className="mt-4">Recommended Ingredients</h2>
      </Row>
      <Row>
        {ingredients.map((homeingredientitem, index) => (<Col className="col-sm-3 pb-4" key={index}><HomeIngredientItem homeingredientitem={homeingredientitem} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHome;
