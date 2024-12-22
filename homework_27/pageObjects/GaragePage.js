export class GaragePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.addCarButton = page.getByRole('button', { name: 'Add car' });
    }
  
    async navigateToGarage() {
      await this.page.goto('https://qauto.forstudy.space/garage');
    }
  
    async isAddCarButtonVisible() {
      return await this.addCarButton.isVisible();
    }
  }
  