import { test as setup, expect } from '@playwright/test';

const autoSchoolUser = 'yana20@gmail.com';
const autoSchoolPwd = 'Qwerty123!';

setup('login', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
      send: 'always',
    },
  });

  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[id="signinEmail"]').fill(autoSchoolUser);
  await page.locator('input[id="signinPassword"]').fill(autoSchoolPwd);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  await context.storageState({ path: 'session-storage.json' });
});
