import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, RadioField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { setUserRoleMethod } from '../../startup/both/Methods';
import { Students } from '../../api/student/Student';
import { Vendors } from '../../api/vendor/Vendor';
import { User } from '../../api/user/User';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    name: String,
    email: String,
    password: String,
    role: {
      label: 'User Role',
      type: String,
      optional: false,
      allowedValues: ['student', 'vendor'],
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { name, email, password, role } = doc;
    // Organization is stored in the built-in "profile" object
    Accounts.createUser({ email, username: email, password, profile: { name: name } }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');

        // Add the role to the user using Meteor Methods
        const userID = Meteor.userId();
        Meteor.call(setUserRoleMethod, { userID: userID, role: role });

        // Save the new account into the respective collection
        const owner = Meteor.user().username;
        if (role === 'student') {
          Students.collection.insert({ name, owner });
          User.collection.insert({ email, password, role });
        } else if (role === 'vendor') {
          Vendors.collection.insert({ name, owner });
          User.collection.insert({ email, password, role });
        }

        setRedirectToRef(true);
      }
    });

    // Save the data to the appropriate user collection
    const owner = Meteor.user().username;
    if (role === 'student') {
      Students.collection.insert(
        { name, owner },
        (err) => {
          if (err) {
            swal('Error', err.message, 'error');
          }
        },
      );
      User.collection.insert(
        { email, password, role },
        (err) => {
          if (err) {
            swal('Error', err.message, 'error');
          }
        },
      );
    } else if (role === 'vendor') {
      Vendors.collection.insert(
        { name, owner },
        (err) => {
          if (err) {
            swal('Error', err.message, 'error');
          } else {
            setRedirectToRef(true);
          }
        },
      );
      User.collection.insert(
        { email, password, role },
        (err) => {
          if (err) {
            swal('Error', err.message, 'error');
          }
        },
      );
    }
  };

  const setPathname = () => {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return ('/admin');
    } if (Roles.userIsInRole(Meteor.userId(), 'student')) {
      return ('/student');
    }
    return ('/vendor');
  };

  const { from } = location?.state || { from: { pathname: setPathname() } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="Name" />
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <RadioField name="role" checkboxes />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
