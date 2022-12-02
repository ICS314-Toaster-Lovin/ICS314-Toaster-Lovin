import { Selector } from 'testcafe';

class UserHomePage {
  constructor() {
    this.pageId = '#user-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Navigate to Recipe Card */
  async checkHomeRecipeCard(testController) {
    // Click through the different cards
    await testController.click('#userhome-recipe-card');
  }

  /** Navigate to Ingredient Card */
  async checkHomeIngredientCard(testController) {
    // Click through the different cards
    await testController.click('#userhome-ingredient-card');
  }
}

export const userHomePage = new UserHomePage();
