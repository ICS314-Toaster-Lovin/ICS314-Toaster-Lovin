import { Meteor } from 'meteor/meteor';
import { Recipe } from '../../api/recipe/Recipe';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Vendors } from '../../api/vendor/Vendor';
import { Students } from '../../api/student/Student';
import { User } from '../../api/user/User';
/* eslint-disable no-console */

// Initialize the recipe database with default recipes
const addRecipeData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Recipe.collection.insert(data);
};

// Initialize the recipe database with default recipes
const addIngredientData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Ingredient.collection.insert(data);
};

// Initialize the vendor database with default vendors
const addVendorData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
};

// Initialize the student database with default students
const addStudentData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Students.collection.insert(data);
};

// Initialize the user database with default users
const addUserData = (data) => {
  console.log(`  Adding: ${data.email}`);
  User.collection.insert(data);
};

// Initialize the RecipeCollection if empty
if (Recipe.collection.find().count() === 0) {
  if (Meteor.settings.recipeData) {
    console.log('Creating default recipe data.');
    Meteor.settings.recipeData.forEach(data => addRecipeData(data));
  }
}

// Initialize the IngredientCollection if empty
if (Ingredient.collection.find().count() === 0) {
  if (Meteor.settings.ingredientData) {
    console.log('Creating default ingredient data.');
    Meteor.settings.ingredientData.forEach(data => addIngredientData(data));
  }
}

// Initialize the VendorCollection if empty
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.vendorData) {
    console.log('Creating default vendor data.');
    Meteor.settings.vendorData.forEach(data => addVendorData(data));
  }
}

// Initialize the StudentCollection if empty
if (Students.collection.find().count() === 0) {
  if (Meteor.settings.studentData) {
    console.log('Creating default student data.');
    Meteor.settings.studentData.forEach(data => addStudentData(data));
  }
}

// Initialize the UserCollection if empty
if (User.collection.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default user data.');
    Meteor.settings.defaultAccounts.forEach(data => addUserData(data));
  }
}
