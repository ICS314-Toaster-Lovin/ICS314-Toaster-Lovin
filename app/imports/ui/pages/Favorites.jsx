import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/recipe/Recipe';
import { Students } from '../../api/student/Student';
import { HomeRecipeItem } from '../components/StudentHomePageItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Favorites = () => {
  const { ready, student, recipes } = useTracker(() => {
    const recipeSubscription = Meteor.subscribe(Recipe.userPublicationName);
    const userSubscription = Meteor.subscribe(Students.userPublicationName);
    const rdy = recipeSubscription.ready() && userSubscription.ready();

    const studentProfile = Students.collection.find({}).fetch();
    const recipeItems = Recipe.collection.find({}).fetch();
    return {
      student: studentProfile[0],
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="favorites-page" className="py-3">
      <Row>
        <Col className="text-center">
          <h2>My Favorites</h2>
        </Col>
      </Row>
      <Row className="d-flex flex-row flex-nowrap row-horizon overflow-auto">
        {!student.favorites.includes('null')
          ? recipes.filter((recipe) => student.favorites.includes(recipe._id)).map((homerecipeitem, index) => (<Col className="col-sm-3" key={index}><HomeRecipeItem homerecipeitem={homerecipeitem} /></Col>))
          : <p className="text-center">You currently have no favorites.</p>}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Favorites;
