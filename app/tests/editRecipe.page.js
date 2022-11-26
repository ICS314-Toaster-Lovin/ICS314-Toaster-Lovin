import { Selector } from 'testcafe';

class EditRecipePage {
  constructor() {
    this.pageId = '#edit-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edits the instructions */
  async editInstructions(testController) {
    await testController.typeText('#edit-recipe-instructions', 'this is a test sentence');
    await testController.click('#edit-recipe-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await testController.click('.swal-button');
  }
}

export const editRecipePage = new EditRecipePage();
