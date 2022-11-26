import { Selector } from 'testcafe';

class SearchRecipePage {
  constructor() {
    this.pageId = '#search-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that this page displays a table with at least three items */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(3);
  }
}

export const searchRecipePage = new SearchRecipePage();
