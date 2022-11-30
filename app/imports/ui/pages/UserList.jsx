import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { User } from '../../api/user/User';
import UserListItem from '../components/UserListItem';

const UserList = () => {

  const { ready, useritems } = useTracker(() => {
    const subscription = Meteor.subscribe(User.adminPublicationName);
    const rdy = subscription.ready();
    const userItems = User.collection.find({}).fetch();

    return {
      useritems: userItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>User List</h2>
          </Col>
          <Table>
            <thead>
              <tr>
                <th>User Email</th>
                <th>Role</th>
                <th>Edit Information</th>
              </tr>
            </thead>
            <tbody>
              {useritems.map((userlistitem) => <UserListItem key={userlistitem._id} userlistitem={userlistitem} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserList;
