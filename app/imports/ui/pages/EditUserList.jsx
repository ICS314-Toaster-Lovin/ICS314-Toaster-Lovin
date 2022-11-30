import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { User } from '../../api/user/User';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  email: String,
  password: String,
  role: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditUserList = () => {
  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);

  const { ready, doc } = useTracker(() => {
    const userSubscription = Meteor.subscribe(User.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = userSubscription.ready();
    // Get the documents
    const document = User.collection.findOne(_id);
    return {
      ready: rdy,
      doc: document,
    };
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    // Get data from the forms
    const { email, password, role } = data;
    // Insert into Recipe Collection
    User.collection.update(_id, { $set: { email, password, role } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'User updated successfully', 'success').then(() => setRedirect(true))));
  };

  if (redirect) return <Navigate to="/user-list" />;

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit User</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col><TextField name="email" id="edituser-form-email" /></Col>
                    </Row>
                  </Col>

                </Row>
                <Col><TextField name="role" id="edituser-form-role" /></Col>
                <SubmitField value="Submit" id="edituser-form-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default EditUserList;
