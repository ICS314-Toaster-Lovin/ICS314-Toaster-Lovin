import { Selector } from 'testcafe';

class AddRecipePage {
  constructor() {
    this.pageId = '#add-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Add a new recipe using the form. */
  async addRecipe(testController) {
    // Fill out form
    await testController.typeText('#addrecipe-form-name', 'Boiled Egg');
    await testController.typeText('#addrecipe-form-serving', '1');
    await testController.typeText('#addrecipe-form-time', '15 minutes');
    await testController.typeText('#addrecipe-form-image', 'https://tse2.mm.bing.net/th?id=OIP.QiHHBsg4Em8cXbORILdBcwHaHa&pid=Api&P=0');
    await testController.typeText('#addrecipe-form-ingredients', 'egg');
    await testController.typeText('#addrecipe-form-instructions', 'Boil water. Add egg. Remove after 6-12 minutes.');
    await testController.click('#addrecipe-form-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await this.pageSelector('.swal-title').withText('Success');
  }
}

export const addRecipePage = new AddRecipePage();
