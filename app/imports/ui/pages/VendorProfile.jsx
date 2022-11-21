import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorInfo from '../components/VendorInfo';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VendorProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendorInfos } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Vendors documents
    const vendorInfoItems = Vendors.collection.find({}).fetch();
    return {
      vendorInfos: vendorInfoItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      {vendorInfos.map((vendors) => <VendorInfo key={vendors.id} vendors={vendors} />)}
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorProfile;
