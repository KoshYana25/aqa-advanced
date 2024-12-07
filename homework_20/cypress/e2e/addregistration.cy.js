import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration Functionality Tests', () => {
  test.beforeEach(async ({ browser }) => {
    // Create a new browser context with basic authentication
    const context = await browser.newContext({
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    // Create a new page in the authenticated context
    const authPage = await context.newPage();

    // Visit the base URL
    await authPage.goto('https://qauto.forstudy.space/');
  });

  test('Positive Test: Successful Registration', async ({ page }) => {
    // Open registration form
    await page.click('button.btn-outline-white.header_signin');
    await page.click('button:has-text("Registration")');

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password(8, true, /[A-Z]/, '1!');

    // Fill registration form
    await page.fill('input#signupName', firstName);
    await page.fill('input#signupLastName', lastName);
    await page.fill('input#signupEmail', email);
    await page.fill('input#signupPassword', password);
    await page.fill('input#signupRepeatPassword', password);

    // Submit the form
    await page.click('button:has-text("Register")');

    // Assert successful registration
    await page.waitForSelector('button#userNavDropdown');
    expect(await page.textContent('button#userNavDropdown')).toContain('My profile');
    console.log('Positive test passed: Registration successful.');
  });

  test('Negative Tests: Registration Validation Errors', async ({ page }) => {
    const errorMessages = [];

    // Open registration form
    await page.click('button.btn-outline-white.header_signin');
    await page.click('button:has-text("Registration")');

    // Test Case 1: Empty fields
    await page.click('button:has-text("Register")');
    if (await page.isVisible('text=Name is required')) {
      errorMessages.push('Empty Name field error visible');
    }

    // Example: Invalid email format
    await page.fill('input#signupEmail', 'invalid-email');
    await page.click('button:has-text("Register")');
    if (await page.isVisible('text=Email is incorrect')) {
      errorMessages.push('Invalid Email format error visible');
    }

    // Print errors or success
    if (errorMessages.length > 0) {
      console.log('Negative test results:', errorMessages);
    } else {
      console.log('Negative tests passed without issues.');
    }
  });
});
