import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IngredientCard from '../components/IngredientCard';

// Placeholder data - replace with Mongo collection
// Only use square images
const spinach = {
  name: 'Spinach',
  stock: 13,
  price: 8.5,
  units: 'lb',
  image: 'https://images.heb.com/is/image/HEBGrocery/000319108?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0',
  owner: 'vendor1@foo.com',
};

const eggs = {
  name: 'Eggs',
  stock: 5,
  price: 7,
  units: 'dozen',
  image: 'https://cdn.shopify.com/s/files/1/0571/1321/5163/products/EGPH-OPENWEGGS.png?v=1653408003',
  owner: 'vendor1@foo.com',
};

const bananas = {
  name: 'Bananas',
  stock: 22,
  price: 5.25,
  units: 'bunch',
  image: 'https://i5.walmartimages.com/asr/3bbb1151-d69a-43fb-b132-47e0bc066307.1f28c1acf3df725a6a39ba4c8738e025.jpeg',
  owner: 'vendor1@foo.com',
};

const VendorHome = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col className="text-center">
        <h2>Your Items</h2>
      </Col>
    </Row>
    <Row md={5}>
      <Col className="mb-3">
        <IngredientCard ingredient={spinach} />
      </Col>
      <Col className="mb-3">
        <IngredientCard ingredient={eggs} />
      </Col>
      <Col className="mb-3">
        <IngredientCard ingredient={bananas} />
      </Col>
    </Row>
  </Container>
);

export default VendorHome;
