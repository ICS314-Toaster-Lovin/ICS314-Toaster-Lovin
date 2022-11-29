import { Selector } from 'testcafe';

class NewestIngredientsPage {
  constructor() {
    this.pageId = '#newest-ingredients-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that this page displays a table with at least four items */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(4);
  }
}

export const newestIngredientsPage = new NewestIngredientsPage();
