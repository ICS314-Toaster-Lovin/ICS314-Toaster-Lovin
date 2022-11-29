import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorProfilePageItem from '../components/VendorProfilePageItem';

/* Renders a page containing all of the Vendor documents. */
const VendorProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendor } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Venor documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Vendors documents
    const vendorInfoItems = Vendors.collection.find({ }).fetch();
    return {
      vendor: vendorInfoItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredVendors = vendor.filter(ven => ven.owner === owner);
  return (ready ? (
    <Container id="vendor-profile-page">
      {filteredVendors.map((vendors) => <VendorProfilePageItem key={vendors.id} vendors={vendors} />)}
      <Row className="py-2 text-center">
        <h4><Link to={`/edit-vendor-profile/${filteredVendors[0]._id}`} id="edit-vendor-profile-link">Edit</Link></h4>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorProfile;
