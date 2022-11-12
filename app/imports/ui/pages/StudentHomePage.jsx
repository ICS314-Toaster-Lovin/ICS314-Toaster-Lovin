import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/stuff/Recipe';
import { HomeRecipeItem, HomeIngredientItem} from '../components/StudentHomePageItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentHomePage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Recipe.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const homePageItems = Recipe.collection.find({}).fetch();
    return {
      user: homePageItems,
      ready: rdy,
    };
  }, []);
  // constant to test if recipes would pass through correctly
  const recipe = [{
    name: 'Spam Musubi',
    servingSize: '1',
    estimatedTime: '10 minutes',
    dietaryRestrictions: 'gluten-free',
    image: 'https://github.com/philipmjohnson.png',
    ingredientList: 'Rice, Spam, Seaweed',
    instructions: 'fry spam, mold rice, cut seaweed, assemble',
  },
  {
    name: 'Top Ramen',
    servingSize: '1',
    estimatedTime: '2 minutes',
    dietaryRestrictions: 'vegan',
    image: 'https://github.com/philipmjohnson.png',
    ingredientList: 'Rice, Spam, Seaweed',
    instructions: 'fry spam, mold rice, cut seaweed, assemble',
  },
  ];

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-left">
            <h2>Favorite Recipes</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => <HomeRecipeItem key={user._id} user={user}/>)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHomePage;
