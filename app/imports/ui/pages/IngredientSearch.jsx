import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';
import IngredientCard from '../components/IngredientCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const IngredientSearch = () => {

  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [minStock, setMinStock] = useState(0);
  const [maxPrice, setMaxPrice] = useState('');
  const [vendor, setVendor] = useState('');

  const { ready, ingredients } = useTracker(() => {
    const subscription = Meteor.subscribe(Ingredient.userPublicationName);
    const rdy = subscription.ready();
    const ingredientItems = Ingredient.collection.find({}).fetch();
    return {
      ingredients: ingredientItems,
      ready: rdy,
    };
  }, []);

  // set ingredients in filteredIngredients when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredIngredients(ingredients);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = ingredients;
    if (ingredientName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(ingredientName.toLowerCase()); });
    }
    if (minStock) {
      filtered = filtered.filter(function (obj) { return obj.quantity >= Number(minStock); });
    }
    if (maxPrice) {
      filtered = filtered.filter(function (obj) { return Number(obj.price.slice(1)) <= Number(maxPrice); });
    }
    if (vendor) {
      filtered = filtered.filter(function (obj) { return obj.vendor.toLowerCase().includes(vendor.toLowerCase()); });
    }
    setFilteredIngredients(filtered);
  }, [ingredientName, minStock, maxPrice, vendor]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Search Ingredients</h2>
      <div id="filter-border-ing">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by ingredient name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Ingredient Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter an ingredient"
                      onChange={e => setIngredientName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by quantity">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Minimum Number in Stock
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a number"
                      onChange={e => setMinStock(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by price">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Maximum Price
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a number"
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by vendor">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Vendor
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter a vendor name"
                      onChange={e => setVendor(e.target.value)}
                    />
                  </label>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <Container className="py-3">
      <Row md={5}>
        {
          filteredIngredients.map(ing => (
            <Col key={ing._id} className="mb-3">
              <IngredientCard ingredient={ing} showEditAndDelete={false} showFooter />
            </Col>
          ))
        }
      </Row>
    </Container>
  );

  return (
    <Container id="search-ing-page">
      <div className="d-flex justify-content-center">
        <Row id="dashboard-screen-ing">
          <Col className="mx-3">
            <Row id="dashboard-filter-ing">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list-ing">{returnList()}</Row> : '' }
            { ready ? '' : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default IngredientSearch;
