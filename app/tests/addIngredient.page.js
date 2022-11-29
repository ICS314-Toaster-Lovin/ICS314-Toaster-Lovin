import { Selector } from 'testcafe';

class AddIngredientPage {
  constructor() {
    this.pageId = '#add-ingredient-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Add a new ingredient using the form. */
  async addIngredient(testController) {
    // Fill out form
    await testController.typeText('#addingredient-form-name', 'Egg');
    await testController.typeText('#addingredient-form-image', 'https://img.livestrong.com/750x/cme-data/getty%2F58d552fe84674587a450b2c84488d52a.jpg?type=webp');
    await testController.typeText('#addingredient-form-quantity', '1');
    await testController.typeText('#addingredient-form-price', '$0.99');
    await testController.click('#addingredient-form-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await this.pageSelector('.swal-title').withText('Success');
  }
}

export const addIngredientPage = new AddIngredientPage();
