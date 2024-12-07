import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Перехід на головну сторінку перед кожним тестом
    await page.goto('/'); // URL буде взятий із baseURL data.env
  });

  test('Positive Test: Successful Registration', async ({ page }) => {
    await page.click('button.btn-outline-white.header_signin');
    await page.click('button:has-text("Registration")');

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password(8, true, /[A-Z]/, '1!');

    
    await page.fill('input#signupName', firstName);
    await page.fill('input#signupLastName', lastName);
    await page.fill('input#signupEmail', email);
    await page.fill('input#signupPassword', password);
    await page.fill('input#signupRepeatPassword', password);

    await page.click('button:has-text("Register")');

    // Перевірка успішної реєстрації
    await page.waitForSelector('button#userNavDropdown');
    expect(await page.textContent('button#userNavDropdown')).toContain('My profile');
    console.log('Positive test passed: Registration successful.');
  });

  test('Negative Tests: Registration Validation Errors', async ({ page }) => {
    await page.waitForSelector('button.btn-outline-white.header_signin');
    await page.click('button.btn-outline-white.header_signin');
    await page.click('button:has-text("Registration")');


    // 2. Некоректна довжина "Name"
    await page.fill('input#signupName', 'A');
    await page.locator('input[id = "signupLastName"]').click();
    await page.isVisible('text=Name has to be from 2 to 20 characters long');

    // 3. Некоректне поле "Last Name"
    await page.fill('input#signupName', 'John');
    await page.fill('input#signupLastName', '');
    await page.isVisible('text=Last name is required');

     // 4. Некоректний email
     await page.fill('input#signupLastName', 'Doe');
     await page.fill('input#signupEmail', 'invalid-email');
     await page.isVisible('text=Email is incorrect');

     // 5. Порожнє поле "Password"
     await page.fill('input#signupEmail', faker.internet.email());
     await page.fill('input#signupPassword', '');
     await page.isVisible('text=Password required')

     // 6. Некоректний формат "Password"
     await page.fill('input#signupPassword', 'short');
     await page.isVisible('text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')


     // 7. Паролі не співпадають
     await page.fill('input#signupPassword', 'ValidPass1');
     await page.fill('input#signupRepeatPassword', 'DifferentPass1');
     await page.isVisible('text=Passwords do not match')

      // 8. Некоректна довжина "Last Name"
    await page.fill('input#signupName', 'John');
    await page.fill('input#signupLastName', 'LoooooooooooooooongLastName');
    await page.isVisible('text=Last name has to be from 2 to 20 characters long')


  });
});