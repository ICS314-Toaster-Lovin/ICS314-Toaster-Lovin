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
import { Vendors } from '../../api/vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  hours: String,
  gps: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditVendorProfile = () => {
  const { _id } = useParams();
  const [redirect, setRedirect] = useState(false);

  const { ready, doc } = useTracker(() => {
    const vendorSubscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = vendorSubscription.ready();
    // Get the documents
    const document = Vendors.collection.findOne(_id);
    return {
      ready: rdy,
      doc: document,
    };
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    // Get data from the forms
    const { name, location, hours, gps } = data;
    const owner = Meteor.user().username;
    // Insert into Recipe Collection
    Vendors.collection.update(_id, { $set: { name, location, hours, gps, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success').then(() => setRedirect(true))));
  };

  if (redirect) return <Navigate to="/vendorprofile" />;

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (ready ? (
    <Container className="py-3" id="edit-vendor-profile-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col><TextField name="name" id="edit-vendor-name" /></Col>
                    </Row>
                  </Col>
                </Row>
                <Col><TextField name="location" id="edit-vendor-location" /></Col>
                <Col><TextField name="hours" id="edit-vendor-hours" /></Col>
                <Col><TextField name="gps" id="edit-vendor-gps" help="Make image as square as possible" /></Col>
                <SubmitField value="Submit" id="edit-vendor-profile-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default EditVendorProfile;
