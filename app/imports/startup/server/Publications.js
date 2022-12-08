import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Recipe } from '../../api/recipe/Recipe';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Vendors } from '../../api/vendor/Vendor';
import { Students } from '../../api/student/Student';
import { User } from '../../api/user/User';

// Recipe publication
Meteor.publish(Recipe.userPublicationName, function () {
  /*
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipe.collection.find({ owner: username });
  }
  return this.ready();
   */
  return Recipe.collection.find();
});

// Ingredient publication
Meteor.publish(Ingredient.userPublicationName, function () {
  /*
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ingredient.collection.find({ owner: username });
  }
  return this.ready();
   */
  return Ingredient.collection.find();
});

// Vendor publication
Meteor.publish(Vendors.userPublicationName, function () {
  // if (this.userId) {
  //   const username = Meteor.users.findOne(this.userId).username;
  //   return Vendors.collection.find({ owner: username });
  // }
  // return this.ready();
  return Vendors.collection.find();
});

// Student publication
Meteor.publish(Students.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Recipe.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipe.collection.find();
  }
  return this.ready();
});

Meteor.publish(Ingredient.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Ingredient.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(Students.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Students.collection.find();
  }
  return this.ready();
});

Meteor.publish(User.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return User.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// publish available roles to client, used when setting roles for new users
Meteor.publish(null, function () {
  return Meteor.roles.find({});
});
