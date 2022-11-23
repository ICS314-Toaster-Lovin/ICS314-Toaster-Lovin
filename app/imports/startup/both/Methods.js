import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const setUserRoleMethod = 'Profile.AddRole';

// Method to add new role to a user
Meteor.methods({
  'Profile.AddRole'({ userID, role }) {
    Roles.addUsersToRoles(userID, role);
  },
});

export { setUserRoleMethod };
