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
}

export const studentProfilePage = new StudentProfilePage();
