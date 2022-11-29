import { Selector } from 'testcafe';

class EditStudentProfilePage {
  constructor() {
    this.pageId = '#edit-student-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edits the information */
  async editProfile(testController) {
    await testController.typeText('#edit-student-name', 'this is a test');
    await testController.click('#edit-student-profile-submit input.btn.btn-primary');

    // Check for Success alert
    await testController.expect(this.pageSelector('.swal-modal').exists).ok();
    await testController.click('.swal-button');
  }
}

export const editStudentProfilePage = new EditStudentProfilePage();
