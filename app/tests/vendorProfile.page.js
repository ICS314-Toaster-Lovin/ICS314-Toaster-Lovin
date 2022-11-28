import { Selector } from 'testcafe';

class VendorProfilePage {
  constructor() {
    this.pageId = '#vendor-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const vendorProfilePage = new VendorProfilePage();
