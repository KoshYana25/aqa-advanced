import { test as base } from '@playwright/test';
import { GaragePage } from '../pageObjects/GaragePage';
import path from 'path';

const storageStatePath = path.resolve(__dirname, '../session-storage.json');

export const test = base.extend({
  /**
   * @type {GaragePage}
   */
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: storageStatePath });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await garagePage.navigateToGarage();

    await use(garagePage);
    await context.close();
  },
});
