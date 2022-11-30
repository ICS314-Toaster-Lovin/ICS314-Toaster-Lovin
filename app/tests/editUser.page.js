import { Selector } from 'testcafe';

class EditUserPage {
  constructor() {
    this.pageId = '#edit-user-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** go to edit link in user list page. */
  async gotoEdit(testController) {
    // Click on Edit Link
    await testController.click('#edituserlist-link');
  }

  /** Edit a user using the form. */
  async editUser(testController) {
    // Fill out form
    await testController.typeText('#edituser-form-email', 'john@foo.com');
    await testController.typeText('#edituser-form-role', 'admin');
    await testController.click('#edituser-form-submit input.btn.btn-primary');
  }

}

export const userListPage = new EditUserPage();
