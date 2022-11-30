import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#admin-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Navigate to Recipe Card */
  async checkHomeRecipeCard(testController) {
    // Click through the different cards
    await testController.click('#adminhome-recipe-card');
    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await this.pageSelector('.swal-title').withText('Success');
  }

  /** Navigate to Ingredient Card */
  async checkHomeIngredientCard(testController) {
    // Click through the different cards
    await testController.click('#adminhome-ingredient-card');
    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await this.pageSelector('.swal-title').withText('Success');
  }
}

export const adminHomePage = new AdminHomePage();
