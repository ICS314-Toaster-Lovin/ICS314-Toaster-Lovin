import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { Ingredient } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  image: String,
  price: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditIngredient = () => {
  const { _id } = useParams();

  const { ready, doc } = useTracker(() => {
    const ingredientSubscription = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = ingredientSubscription.ready();
    // Get the documents
    const document = Ingredient.collection.findOne(_id);
    return {
      ready: rdy,
      doc: document,
    };
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    // Get data from the forms
    const { name, quantity, price, image } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date();
    // Insert into Recipe Collection
    Ingredient.collection.update(_id, { $set: { name, quantity, price, image, owner, createdAt } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success').then(() => { window.location.href = '/vendor'; })));
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Ingredient</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
                <Col><TextField name="quantity" /></Col>
                <Col><TextField name="price" /></Col>
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

export default EditIngredient;
