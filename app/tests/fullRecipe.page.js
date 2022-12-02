import { Selector } from 'testcafe';

class FullRecipePage {
  constructor() {
    this.pageId = '#full-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Goes to Edit Recipe Page */
  async gotoEditRecipe(testController) {
    await testController.click('#edit-recipe-link');
  }

  /** Confirms that instruction were edited after submitting on Edit Recipe page */
  async confirmEdits(testController) {
    const modifiedInstructions = Selector('#recipe-instructions').withText('this is a test sentence');
    await testController.expect(modifiedInstructions.exists).ok();
  }

  /** Clicks on the favorite icon */
  async favorite(testController) {
    await testController.click('#favorite');
  }
}

export const fullRecipePage = new FullRecipePage();
