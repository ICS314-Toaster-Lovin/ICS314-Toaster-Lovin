import { Selector } from 'testcafe';

class StudentProfilePage {
  constructor() {
    this.pageId = '#student-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Goes to Full Recipe Page */
  async gotoFullRecipe(testController) {
    await testController.click('#full-recipe-page');
  }

  /** Goes to Edit Student Profile Page */
  async gotoEditStudentProfile(testController) {
    await testController.click('#edit-student-profile-link');
  }

  /** Confirms that profile was edited after submitting on Edit Student Profile page */
  async confirmEdits(testController) {
    const modifiedName = Selector('#student-name').withText('this is a test');
    await testController.expect(modifiedName.exists).ok();
  }
}

export const studentProfilePage = new StudentProfilePage();
