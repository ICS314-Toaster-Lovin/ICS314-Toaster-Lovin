import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { addRecipePage } from './addrecipe.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const student = { username: 'john@foo.com', password: 'changeme' };
const vendor = { username: 'admin@foo.com', password: 'changeme' };
const admin = { username: 'walmart@foo.com', password: 'changeme' };

fixture('meteor-react-bootstrap-template localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  // Test student account
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.isLoggedIn(testController, student.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);

  // Test vendor account
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, vendor.username, vendor.password);
  await navBar.isLoggedIn(testController, vendor.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);

  // Test admin account
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Add Recipe page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
  await addRecipePage.addRecipe(testController);
});
