// tests/registration.spec.js
const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../pageObjects/registration');
import { faker } from '@faker-js/faker';

test.describe('Registration Functionality Tests', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToHomePage();
  });

  test('Positive Test: Successful Registration', async () => {
    await registrationPage.openRegistrationForm();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password(8, true, /[A-Z]/, '1!');

    await registrationPage.fillRegistrationForm(firstName, lastName, email, password, password);
    await registrationPage.submitRegistrationForm();

    // Verify successful registration
    expect(await registrationPage.isProfileDropdownVisible()).toBeTruthy();
    console.log('Positive test passed: Registration successful.');
  });

  test('Negative Tests: Registration Validation Errors', async () => {
    await registrationPage.openRegistrationForm();

    // 2. Invalid length for "Name"
    await registrationPage.fillRegistrationForm('A', 'Doe', '', '', '');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.nameError)).toBeTruthy();

    // 3. Empty "Last Name"
    await registrationPage.fillRegistrationForm('John', '', '', '', '');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.lastNameError)).toBeTruthy();

    // 4. Invalid email
    await registrationPage.fillRegistrationForm('John', 'Doe', 'invalid-email', '', '');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.emailError)).toBeTruthy();

    // 5. Empty "Password"
    await registrationPage.fillRegistrationForm('John', 'Doe', faker.internet.email(), '', '');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.passwordRequiredError)).toBeTruthy();

    // 6. Invalid "Password" format
    await registrationPage.fillRegistrationForm('John', 'Doe', faker.internet.email(), 'short', 'short');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.passwordFormatError)).toBeTruthy();

    // 7. Passwords do not match
    await registrationPage.fillRegistrationForm('John', 'Doe', faker.internet.email(), 'ValidPass1', 'DifferentPass1');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.passwordMismatchError)).toBeTruthy();

    // 8. Invalid length for "Last Name"
    await registrationPage.fillRegistrationForm('John', 'LoooooooooooooooongLastName', '', '', '');
    expect(await registrationPage.isValidationErrorVisible(registrationPage.locators.lastNameLengthError)).toBeTruthy();
  });
});
