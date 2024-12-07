// page-objects/RegistrationPage.js
const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

class RegistrationPage {
  locators = {
    // Navigation locators
    signInButton: 'button.btn-outline-white.header_signin',
    registrationTab: 'button:has-text("Registration")',

    // Registration form locators
    nameInput: 'input#signupName',
    lastNameInput: 'input#signupLastName',
    emailInput: 'input#signupEmail',
    passwordInput: 'input#signupPassword',
    repeatPasswordInput: 'input#signupRepeatPassword',
    registerButton: 'button:has-text("Register")',

    // Validation error locators
    nameError: 'text=Name has to be from 2 to 20 characters long',
    lastNameError: 'text=Last name required',
    emailError: 'text=Email is incorrect',
    passwordRequiredError: 'text=Password required',
    passwordFormatError: 'text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    passwordMismatchError: 'text=Passwords do not match',
    lastNameLengthError: 'text=Last name has to be from 2 to 20 characters long',

   
    userNavDropdown: 'button#userNavDropdown',
  };

  constructor(page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('/'); // baseURL from Playwright config
  }

  async openRegistrationForm() {
    await this.page.click(this.locators.signInButton);
    await this.page.click(this.locators.registrationTab);
  }

  async fillRegistrationForm(firstName, lastName, email, password, repeatPassword) {
    await this.page.fill(this.locators.nameInput, firstName);
    await this.page.fill(this.locators.lastNameInput, lastName);
    await this.page.fill(this.locators.emailInput, email);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.fill(this.locators.repeatPasswordInput, repeatPassword);
  }

  async submitRegistrationForm() {
    await this.page.click(this.locators.registerButton);
  }

  async isProfileDropdownVisible() {
    await this.page.waitForSelector(this.locators.userNavDropdown);
    return this.page.isVisible(this.locators.userNavDropdown);
  }

  async isValidationErrorVisible(errorLocator) {
    return this.page.isVisible(errorLocator);
  }
}

module.exports = RegistrationPage;
