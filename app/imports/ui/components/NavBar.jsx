import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/ramen-logo.png" width="100px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser === '' ? (
              <Nav.Link id="search-nav" as={NavLink} to="/search" key="search">Search</Nav.Link>
            ) : (
              ''
            )}
            {currentUser ? ([
              <Nav.Link id="home-nav" as={NavLink} to="/home" key="home">Home</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'student') ? ([
              <Nav.Link id="favorites-nav" as={NavLink} to="/favorites" key="favorites">Favorites</Nav.Link>,
              <Nav.Link id="add-recipe-nav" as={NavLink} to="/add-recipe" key="add-recipe">Add Recipe</Nav.Link>,
              <Nav.Link id="search-nav" as={NavLink} to="/search" key="search">Search</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
              <Nav.Link id="user-list-admin-nav" as={NavLink} to="/user-list" key="user-list">User List</Nav.Link>,
              <Nav.Link id="newest-recipes-admin-nav" as={NavLink} to="/newest-recipes" key="newest-recipes">Newest Recipes</Nav.Link>,
              <Nav.Link id="newest-Ingredients-admin-nav" as={NavLink} to="/newest-ingredients" key="newest-ingredients">Newest Ingredients</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                  <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                ) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
                  <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                ) : ''}
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
