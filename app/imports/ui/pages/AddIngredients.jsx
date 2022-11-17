import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Ingredient } from '../../api/ingredient/Ingredient';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  image: String,
  price: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddIngredient = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    // Get data from the forms
    const { name, quantity, price, image } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date();
    // Insert into Recipe Collection
    Ingredient.collection.insert(
      { name, quantity, price, image, owner, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Ingredient added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Ingredient</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col><TextField name="name" /></Col>
                    </Row>
                  </Col>

                </Row>
                <Col><TextField name="image" /></Col>
                <Col><LongTextField name="quantity" /></Col>
                <Col><LongTextField name="price" /></Col>
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

export default AddIngredient;
