import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Recipe } from '../../api/recipe/Recipe';
import { Ingredient } from '../../api/ingredient/Ingredient';
/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

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

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

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
