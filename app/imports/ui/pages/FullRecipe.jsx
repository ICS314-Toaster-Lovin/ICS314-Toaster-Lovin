import React, { useRef } from 'react';
import { Container, Image, ListGroup, Row, Col} from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, AlarmFill, PersonFill } from 'react-bootstrap-icons';

// Placeholder data - replace with Mongo collection
const recipe = {
  name: 'Bacon Omelette',
  ingredientList: ['2 eggs', '5 cherry tomatoes', '1 cup spinach', '1/2 cup mushrooms', '1/4 cup diced bacon', '1/2 Tbsp butter'],
  instructions: 'Beat the eggs in a small bowl until smooth. Heat the pan and melt the butter. Once melted, sautee the spinach, mushrooms, tomatoes, and bacon for 2 minutes. Then add the eggs to the pan and reduce to low heat. Once the eggs are nearly set, fold the omelette and turn off the heat.',
  estimatedTime: 4,
  servingSize: 1,
  glutenFree: true,
  lactoseFree: true,
  vegan: false,
  vegetarian: false,
  image: 'https://www.simplyrecipes.com/thmb/LLhiA8KZ7JZ5ZI0g-1bF1eg-gGM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__10__HT-Make-an-Omelet-LEAD-HORIZONTAL-17cd2e469c4a4ccbbd1273a7cae6425c.jpg',
  owner: 'john@foo.com',
};

const FullRecipe = () => {
  const vendorList = useRef();

  /* Shows a list of vendors that carry an ingredient */
  function showVendors(e) {
    vendorList.current.style.display = 'block';
    vendorList.current.style.top = `${e.pageY - 95}px`;
  }

  /* Hides the list of vendors */
  function hideVendors() {
    vendorList.current.style.display = 'none';
  }

  return (
    <Container className="py-3">
      <div className="d-flex">
        <div>
          <h1>{recipe.name}</h1>
          <Image rounded style={{ alignSelf: 'start' }} width={400} src={recipe.image} />
          <div className="d-flex align-items-center mt-1">
            <AlarmFill className="me-1" /> {recipe.estimatedTime} minutes
            <PersonFill className="ms-3 me-1" /> {recipe.servingSize} {recipe.servingSize === 1 ? 'serving' : 'servings'}
          </div>
          <Row className="mt-3 mb-1">
            <Col md={5} style={{ marginRight: '-30px' }}>
              {
                recipe.glutenFree ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Gluten-free</span> <br />
            </Col>
            <Col>
              {
                recipe.vegan ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Vegan</span> <br />
            </Col>
          </Row>
          <Row>
            <Col md={5} style={{ marginRight: '-30px' }}>
              {
                recipe.lactoseFree ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Lactose-free</span> <br />
            </Col>
            <Col>
              {
                recipe.vegetarian ?
                  <CheckCircleFill color="green" size={25} /> :
                  <XCircleFill color="red" size={25} />
              } <span>Vegetarian</span> <br />
            </Col>
          </Row>
        </div>
        <div className="ms-5" style={{ minWidth: '200px', maxWidth: '300px', wordBreak: 'break-word', position: 'relative' }}>
          <h4 className="text-center" style={{ marginTop: '19px' }}><u>Ingredients</u></h4>
          <ListGroup>
            {recipe.ingredientList.map((ingredient, idx) => (
              <ListGroup.Item
                action
                onMouseEnter={showVendors}
                onMouseLeave={hideVendors}
                key={idx}
              >{ingredient}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div ref={vendorList} className="border bg-light pe-3 pt-3" style={{ position: 'absolute', display: 'none', right: -170, zIndex: 1 }}>
            <ul>
              <li>Vendor 1: $5 / lb</li>
              <li>Vendor 2: $4 / lb</li>
              <li>Vendor 3: $7 / lb</li>
            </ul>
          </div>
        </div>
        <div className="ms-5">
          <h4 className="text-center" style={{ marginTop: '19px' }}><u>Instructions</u></h4>
          <p className="border rounded px-3 py-2">{recipe.instructions}</p>
        </div>
      </div>
    </Container>
  );
};

export default FullRecipe;
