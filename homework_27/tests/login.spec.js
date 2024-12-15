import { test, loginAsUser } from '../fixtures/userGaragePage.js';
import { expect } from '@playwright/test';

test.describe('Garage Page Tests', () => {
  test.beforeAll(async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

 
    await loginAsUser(page, baseURL);
    await context.close();
  });

  test('Verify user is logged in and sees Add car button', async ({ userGaragePage }) => {
     // Перевірка наявності кнопки
     const buttonText = await userGaragePage.locator('button.btn-primary').textContent();
     expect(buttonText).toContain('Add car');
  });
});
