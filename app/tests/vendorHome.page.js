import { Selector } from 'testcafe';

class VendorHomePage {
  constructor() {
    this.pageId = '#vendor-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Clicks on the edit link on ingredient card */
  async clickEditLink(testController) {
    await testController.click('#edit-ingredient-link');
  }

  /** Confirms that name was edited after submitting on Edit Ingredient page */
  async confirmEdits(testController) {
    const modifiedName = Selector('#ingredient-card-title').withText('this is a test sentence');
    await testController.expect(modifiedName.exists).ok();
  }
}

export const vendorHomePage = new VendorHomePage();
