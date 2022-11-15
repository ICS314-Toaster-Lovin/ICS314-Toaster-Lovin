import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, ButtonGroup, Col, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Recipe } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeItem from '../components/RecipeItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const RecipeSearch = () => {

  // const [filteredRecipes, setFilteredRecipes] = useState([]);

  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipe.userPublicationName);
    const rdy = subscription.ready();
    const recipeItems = Recipe.collection.find({}).fetch();
    console.log(recipeItems);
    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  const returnFilter = () => (
    <div className="pb-3">
      <h1 className="mt-4 text-center mb-2"><b>Search Recipes</b></h1>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              Hi
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div style={{ height: '100vh', overflowY: 'visible' }}>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>Image</th>
            <th>Recipe Name</th>
            <th>Serving Size</th>
            <th>Estimated Time</th>
            <th>Ingredients</th>
            <th>Dietary Restrictions</th>
          </tr>
        </thead>
        <tbody>
          { recipes.length === 0 ? (<tr><td>-</td></tr>) : recipes
            .map((recipe) => <RecipeItem key={recipe._id} recipe={recipe} />)}
        </tbody>
      </Table>
      { recipes.length === 0 ? <div className="d-flex justify-content-center">No recipes found.</div> : '' }
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Row id="dashboard-screen">
          <Col className="mx-3">
            <Row id="dashboard-filter">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list">{returnList()}</Row> : '' }
            { ready ? '' : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecipeSearch;
