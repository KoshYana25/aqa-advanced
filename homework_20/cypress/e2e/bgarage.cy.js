import { garagePage } from "../pageObjects/garage.page";

describe("Garage Tests", () => {
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

    // Логін
    cy.get('input[id="signinEmail"]').type(Cypress.config("email"));
    cy.get('input[id="signinPassword"]').type(Cypress.config("password"));
    cy.get(".btn-primary").contains("Login").click();
  });

  it("should add a new car to the garage", () => {
    // Використання методу для додавання машини
    garagePage.addCar("Audi", "TT", "10000");
    // Перевірка, чи з’явилась машина
    cy.contains("Audi TT").should("be.visible");
  });
});