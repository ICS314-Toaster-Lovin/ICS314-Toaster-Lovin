import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/stuff/Recipe';
import { HomeRecipeItem } from '../components/StudentHomePageItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentHomePage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipe.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Recipe documents
    const recipeItems = Recipe.collection.find({}).fetch();
    return {
      stuffs: recipeItems,
      ready: rdy,
    };
  }, []);

  // constant to test if recipes would pass through correctly
  const recipes = [{
    name: 'Spam Musubi',
    servingSize: '10',
    estimatedTime: '10 minutes',
    glutenFree: '0',
    lactoseFree: '0',
    vegan: '0',
    vegetarian: '0',
    image: 'https://github.com/philipmjohnson.png',
    ingredientList: 'Rice, Spam, Seaweed',
    instructions: 'fry spam, mold rice, cut seaweed, assemble',
  },
  { name: 'Top Ramen',
    servingSize: '10',
    estimatedTime: '2 minutes',
    glutenFree: '0',
    lactoseFree: '0',
    vegan: '0',
    vegetarian: '0',
    image: 'https://github.com/philipmjohnson.png',
    ingredientList: 'Rice, Spam, Seaweed',
    instructions: 'fry spam, mold rice, cut seaweed, assemble',
  },
  ];

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-left">
            <h2>Favorite Recipes</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recipes.map((homerecipeitem, index) => (<Col key={index}><HomeRecipeItem homerecipeitem={homerecipeitem} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHomePage;
