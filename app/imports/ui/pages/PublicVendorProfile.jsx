import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorInfo from '../components/VendorInfo';

/* Renders a page containing all of the Vendor documents. */
const PublicVendorProfile = () => {
  const { name } = useParams();

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, doc } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Vendors documents
    const vendor = Vendors.collection.findOne({ name: name });
    return {
      doc: vendor,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="public-vendor-profile-page">
      <VendorInfo vendors={doc} />
    </Container>
  ) : <LoadingSpinner />);
};

export default PublicVendorProfile;
