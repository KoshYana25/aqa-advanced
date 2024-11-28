// cypress/integration/registration_tests.spec.js

import { faker } from "@faker-js/faker";

describe("Registration Functionality Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"), {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get("button.btn-outline-white.header_signin")
      .contains("Sign In")
      .click();
  });

  it("Should successfully register with random valid data", () => {
    // Генеруємо рандомні дані
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password(8, true, /[A-Z]/, "1!");

    // Використовуємо згенеровані дані у реєстрації
    cy.get("button").contains("Registration").click();
    cy.get('input[id="signupName"]').type(firstName);
    cy.get('input[id="signupLastName"]').type(lastName);
    cy.get('input[id="signupEmail"]').type(email);
    cy.get('input[id="signupPassword"]').type(password, {
      sensitive: true,
    });
    cy.get('input[id="signupRepeatPassword"]').type(password, {
      sensitive: true,
    });

    cy.get("button").contains("Register").click();
    cy.get('button[id="userNavDropdown"]').should("contain", "My profile");
  });

  it("Should successfully log in with valid credentials", () => {
    cy.get('input[id="signinEmail"]').type(Cypress.config("email"));
    cy.get('input[id="signinPassword"]').type(Cypress.config("password"), {
      sensitive: true,
    });
    cy.get("button").contains("Login").click();

    cy.get('button[id="userNavDropdown"]').should("contain", "My profile");
  });
});
