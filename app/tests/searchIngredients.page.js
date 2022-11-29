import { Selector } from 'testcafe';

class SearchIngredientsPage {
  constructor() {
    this.pageId = '#search-ing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Clicks on Walmart link to go to public vendor profile page */
  async clickWalmartLink(testController) {
    const walmart = Selector('a').withText('Walmart');
    await testController.click(walmart);
  }
}

export const searchIngredientsPage = new SearchIngredientsPage();
