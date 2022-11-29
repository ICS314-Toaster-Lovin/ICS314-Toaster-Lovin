import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { addRecipePage } from './addrecipe.page';
import { navBar } from './navbar.component';
import { searchRecipePage } from './searchrecipe.page';
import { searchIngredientsPage } from './searchIngredients.page';
import { fullRecipePage } from './fullRecipe.page';
import { editRecipePage } from './editRecipe.page';
import { publicVendorProfilePage } from './publicVendorProfile.page';
import { vendorHomePage } from './vendorHome.page';
import { editIngredientPage } from './editIngredient.page';
import { studentProfilePage } from './studentProfile.page';
import { vendorProfilePage } from './vendorProfile.page';
import { newestIngredientsPage } from './newestingredients.page';
import { newestRecipesPage } from './newestrecipes.page';
import { editStudentProfilePage } from './editStudentProfile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const student = { username: 'john@foo.com', password: 'changeme' };
const vendor = { username: 'walmart@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };

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

test('Test the Search Recipe page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.gotoSearchRecipesPage(testController);
  await searchRecipePage.isDisplayed(testController);
  await searchRecipePage.hasTable(testController);
});

test('Test the Search Ingredients page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.gotoSearchIngredientsPage(testController);
  await searchIngredientsPage.isDisplayed(testController);
});

test('Test the Full Recipe and Edit Recipe pages', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  // Goes to the student profile page so it can click on a link to the full recipe page
  await navBar.gotoStudentProfile(testController);
  const baconOmelette = Selector('a').withText('Bacon Omelette');
  await testController.click(baconOmelette);
  await fullRecipePage.isDisplayed(testController);

  // Test Edit Recipe page
  await fullRecipePage.gotoEditRecipe(testController);
  await editRecipePage.isDisplayed(testController);
  await editRecipePage.editInstructions(testController);
  await fullRecipePage.confirmEdits(testController);
});

test('Test the Edit Ingredient page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, vendor.username, vendor.password);
  await navBar.gotoVendorHomePage(testController);
  await vendorHomePage.clickEditLink(testController);
  await editIngredientPage.isDisplayed(testController);
  await editIngredientPage.editInstructions(testController);
  await vendorHomePage.confirmEdits(testController);
});

test('Test the Public Vendor Profile page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.gotoSearchIngredientsPage(testController);
  await searchIngredientsPage.clickWalmartLink(testController);
  await publicVendorProfilePage.isDisplayed(testController);
});

test('Test the Student Profile and Edit Student Profile pages', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
  const baconOmelette = Selector('a').withText('Bacon Omelette');
  await testController.click(baconOmelette);
  await fullRecipePage.isDisplayed(testController);

  // Test Edit Student Profile page
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
  await studentProfilePage.gotoEditStudentProfile(testController);
  await editStudentProfilePage.isDisplayed(testController);
  await editStudentProfilePage.editProfile(testController);
  await studentProfilePage.confirmEdits(testController);
});

test('Test the Vendor Profile page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, vendor.username, vendor.password);
  await navBar.gotoVendorProfile(testController);
  await vendorProfilePage.isDisplayed(testController);
});

test('Test the Vendor Home page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, vendor.username, vendor.password);
  await navBar.gotoVendorHomePage(testController);
  await vendorHomePage.isDisplayed(testController);
});

test('Test the Newest Ingredients page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoNewestIngredientsPage(testController);
  await newestIngredientsPage.isDisplayed(testController);
  await newestIngredientsPage.hasTable(testController);
});

test('Test the Newest Recipes page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoNewestRecipesPage(testController);
  await newestRecipesPage.isDisplayed(testController);
  await newestRecipesPage.hasTable(testController);
});
