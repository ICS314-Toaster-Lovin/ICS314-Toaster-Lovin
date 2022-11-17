import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipe } from '../../api/recipe/Recipe';

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

const AddRecipe = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    // Get data from the forms
    const { name, servingSize, estimatedTime, image, ingredientList, instructions, dietaryRestrictions } = data;
    // for Recipe collection fields
    const owner = Meteor.user().username;
    const glutenFree = dietaryRestrictions.includes('Gluten Free');
    const lactoseFree = dietaryRestrictions.includes('Lactose Free');
    const vegan = dietaryRestrictions.includes('Vegan');
    const vegetarian = dietaryRestrictions.includes('Vegetarian');
    const createdAt = new Date();
    console.log(createdAt);
    // Insert into Recipe Collection
    Recipe.collection.insert(
      { name, servingSize, estimatedTime, glutenFree, lactoseFree, vegan, vegetarian, image, ingredientList, instructions, owner, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  const transform = (label) => ` ${label}`;
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Recipe</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
  );
};

export default AddRecipe;
