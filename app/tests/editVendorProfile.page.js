import { Selector } from 'testcafe';

class EditVendorProfilePage {
  constructor() {
    this.pageId = '#edit-vendor-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edits the information */
  async editVendorProfile(testController) {
    await testController.typeText('#edit-vendor-name', 'this is a test');
    await testController.click('#edit-vendor-profile-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await testController.click('.swal-button');
  }
}

export const editVendorProfilePage = new EditVendorProfilePage();
