import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipe } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  servingSize: Number,
  estimatedTime: String,
  dietaryRestrictions: Array,
  'dietaryRestrictions.$': { type: String, allowedValues: ['Gluten Free', 'Lactose Free', 'Vegan', 'Vegetarian'] },
  image: String,
  ingredientList: String,
  instructions: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditRecipe = () => {
  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);

  const { ready, doc } = useTracker(() => {
    const ingredientSubscription = Meteor.subscribe(Recipe.userPublicationName);
    // Determine if the subscription is ready
    const rdy = ingredientSubscription.ready();
    // Get the documents
    const document = Recipe.collection.findOne(_id);
    return {
      ready: rdy,
      doc: document,
    };
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    // Get data from the forms
    const { name, servingSize, estimatedTime, image, ingredientList, instructions, dietaryRestrictions } = data;
    // for Recipe collection fields
    const owner = Meteor.user().username;
    const glutenFree = dietaryRestrictions.includes('Gluten Free');
    const lactoseFree = dietaryRestrictions.includes('Lactose Free');
    const vegan = dietaryRestrictions.includes('Vegan');
    const vegetarian = dietaryRestrictions.includes('Vegetarian');
    const createdAt = new Date();
    // Insert into Recipe Collection
    Recipe.collection.update(_id, { $set: { name, servingSize, estimatedTime, glutenFree, lactoseFree, vegan, vegetarian, image, ingredientList, instructions, owner, createdAt } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Recipe updated successfully', 'success').then(() => setRedirect(true))));
  };

  // Add dietary restrictions into an array so Autoforms can read as a model
  doc.dietaryRestrictions = [];
  if (doc.glutenFree) doc.dietaryRestrictions.push('Gluten Free');
  if (doc.lactoseFree) doc.dietaryRestrictions.push('Lactose Free');
  if (doc.vegan) doc.dietaryRestrictions.push('Vegan');
  if (doc.vegetarian) doc.dietaryRestrictions.push('Vegetarian');

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  const transform = (label) => ` ${label}`;

  if (redirect) return <Navigate to={`/recipe/${doc._id}`} />;

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Recipe</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col><TextField name="name" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="servingSize" decimal={null} /></Col>
                      <Col><TextField name="estimatedTime" /></Col>
                    </Row>
                  </Col>
                  <Col md="auto"><SelectField name="dietaryRestrictions" multiple checkboxes transform={transform} /></Col>
                </Row>
                <Col><TextField name="image" /></Col>
                <Col><LongTextField name="ingredientList" /></Col>
                <Col><LongTextField name="instructions" /></Col>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default EditRecipe;
