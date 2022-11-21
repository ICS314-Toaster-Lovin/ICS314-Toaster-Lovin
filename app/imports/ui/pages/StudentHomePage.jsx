import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/recipe/Recipe';
import { HomeIngredientItem, HomeRecipeItem } from '../components/StudentHomePageItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Ingredient } from '../../api/ingredient/Ingredient';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentHomePage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, recipes, ingredients } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipe.userPublicationName);
    const subscription2 = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();

    // Get the Recipe documents
    const recipeItems = Recipe.collection.find({}).fetch();
    const ingredientItems = Ingredient.collection.find({}).fetch();
    return {
      ingredients: ingredientItems,
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row>
        <h2 className="mt-2">Favorite Recipe</h2>
      </Row>
      <Row className="d-flex flex-row flex-nowrap row-horizon overflow-auto">
        {recipes.map((homerecipeitem, index) => (<Col className="col-sm-3" key={index}><HomeRecipeItem homerecipeitem={homerecipeitem} /></Col>))}
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

export default StudentHomePage;
