import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorInfo from '../components/VendorInfo';

/* Renders a page containing all of the Vendor documents. */
const VendorProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, email } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Venor documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Vendors documents
    const vendorInfoItems = Vendors.collection.find({ }).fetch();
    return {
      email: vendorInfoItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredVendors = email.filter(vendor => vendor.owner === owner);

  return (ready ? (
    <Container>
      {filteredVendors.map((vendors) => <VendorInfo key={vendors.id} vendors={vendors} />)}
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorProfile;
