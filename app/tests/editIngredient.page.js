import { Selector } from 'testcafe';

class EditIngredientPage {
  constructor() {
    this.pageId = '#edit-ingredient-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edits the instructions */
  async editInstructions(testController) {
    await testController.typeText('#edit-ingredient-name', 'this is a test sentence');
    await testController.click('#edit-ingredient-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await testController.click('.swal-button');
  }
}

export const editIngredientPage = new EditIngredientPage();
