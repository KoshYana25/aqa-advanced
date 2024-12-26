import { test, expect } from '@playwright/test';

const autoSchoolUser = 'yana20@gmail.com';
const autoSchoolPwd = 'Qwerty123!';

test.describe('Login and Profile Display Tests with Mocked Response', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  });

  test('Successful login and mocked profile display', async ({ page }) => {
    let intercepted = false;

    // Перехоплюємо запит і підміняємо його відповідь
    await page.route('https://qauto.forstudy.space/api/users/profile', async (route) => {
      const mockResponse = {
        data: {
          userId: 164900,
          photoFilename: "default-user.png",
          name: "Yana",
          lastName: "Kosh",
          country: "Ukraine",
          dateBirth: "2004-12-14T00:00:00.000Z",
        },
        status: "ok",
      };
      intercepted = true; 
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    });

    // Логін
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('input[id="signinEmail"]').fill(autoSchoolUser);
    await page.locator('input[id="signinPassword"]').fill(autoSchoolPwd);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();

    // Перехід на сторінку профілю
    await page.click('a.btn.btn-white.btn-sidebar.sidebar_btn.-profile');


    expect(intercepted).toBeTruthy();

    // Перевірка підмінених даних
    await expect(page.locator('p.profile_name.display-4')).toHaveText('Yana Kosh', { timeout: 10000 });
    
    await expect(
      page.locator('span.profile-info_text', { hasText: 'Ukraine' })
    ).toHaveText('Ukraine', { timeout: 10000 });

    
    await expect(
      page.locator('span.profile-info_text', { hasText: '14.12.2004' })
    ).toHaveText('14.12.2004', { timeout: 10000 });

  });


  test('Add car after setup login', { tag: '@showcase' }, async({ browser, page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('input[id="signinEmail"]').fill(autoSchoolUser);
    await page.locator('input[id="signinPassword"]').fill(autoSchoolPwd);
    await page.getByRole('button', { name: 'Login' }).click();
    
    const createCarrRequest = page.waitForRequest('**/api/cars');
   
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.locator('input[id="addCarMileage"]').fill('234')
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Add' }).click();
    const requestFinished = await createCarrRequest;
    console.log(await (await requestFinished.response()).json());
  })




  

});
