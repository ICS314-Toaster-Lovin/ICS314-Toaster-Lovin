import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Students } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  dietaryRestrictions: Array,
  'dietaryRestrictions.$': { type: String, allowedValues: ['Gluten Free', 'Lactose Free', 'Vegan', 'Vegetarian'] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditStudentProfile = () => {
  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);

  const { ready, doc } = useTracker(() => {
    const studentSubscription = Meteor.subscribe(Students.userPublicationName);
    // Determine if the subscription is ready
    const rdy = studentSubscription.ready();
    // Get the documents
    const document = Students.collection.findOne(_id);
    return {
      ready: rdy,
      doc: document,
    };
  }, [_id]);

  // On submit, insert the data.
  const submit = (data) => {
    // Get data from the forms
    const { name, dietaryRestrictions } = data;
    // for Student collection fields
    const owner = Meteor.user().username;
    const glutenFree = dietaryRestrictions.includes('Gluten Free');
    const lactoseFree = dietaryRestrictions.includes('Lactose Free');
    const vegan = dietaryRestrictions.includes('Vegan');
    const vegetarian = dietaryRestrictions.includes('Vegetarian');
    // Insert into Student Collection
    Students.collection.update(_id, { $set: { name, glutenFree, lactoseFree, vegan, vegetarian, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success').then(() => setRedirect(true))));
  };

  // Add dietary restrictions into an array so Autoforms can read as a model
  doc.dietaryRestrictions = [];
  if (doc.glutenFree) doc.dietaryRestrictions.push('Gluten Free');
  if (doc.lactoseFree) doc.dietaryRestrictions.push('Lactose Free');
  if (doc.vegan) doc.dietaryRestrictions.push('Vegan');
  if (doc.vegetarian) doc.dietaryRestrictions.push('Vegetarian');

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  const transform = (label) => ` ${label}`;

  if (redirect) return <Navigate to="/profile" />;

  return (ready ? (
    <Container className="py-3" id="edit-student-profile-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col><TextField name="name" /></Col>
                    </Row>
                  </Col>
                  <Col md="auto"><SelectField name="dietaryRestrictions" multiple checkboxes transform={transform} /></Col>
                </Row>
                <SubmitField value="Submit" id="edit-student-profile-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default EditStudentProfile;
