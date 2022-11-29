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

  /** Goes to Edit Vendor Profile Page */
  async gotoEditVendorProfile(testController) {
    await testController.click('#edit-vendor-profile-link');
  }

  /** Confirms that profile was edited after submitting on Edit Student Profile page */
  async confirmEdits(testController) {
    const modifiedName = Selector('#vendor-name').withText('this is a test');
    await testController.expect(modifiedName.exists).ok();
  }
}

export const vendorProfilePage = new VendorProfilePage();
