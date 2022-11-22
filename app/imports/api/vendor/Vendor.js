import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VendorCollection. It encapsulates state and variable values for stuff.
 */
class VendorCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      hours: String,
      gps: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.vendor`;
  }
}

/**
 * The singleton instance of the VendorCollection.
 * @type {VendorCollection}
 */
export const Vendors = new VendorCollection();
