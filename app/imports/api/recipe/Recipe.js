import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RecipeCollection. It encapsulates state and variable values for stuff.
 */
class RecipeCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RecipeCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      servingSize: Number,
      estimatedTime: String,
      glutenFree: Boolean,
      lactoseFree: Boolean,
      vegan: Boolean,
      vegetarian: Boolean,
      image: String,
      ingredientList: String,
      instructions: String,
      owner: String,
      createdAt: Date,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RecipeCollection.
 * @type {RecipeCollection}
 */
export const Recipe = new RecipeCollection();
