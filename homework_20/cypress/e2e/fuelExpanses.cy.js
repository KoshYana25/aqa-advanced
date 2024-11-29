import { expensesPage } from "../pageObjects/expenses.page";

describe("Expenses Tests", () => {
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

    // Логін із змінних середовища
    cy.get('input[id="signinEmail"]').type(Cypress.config("email"));
    cy.get('input[id="signinPassword"]').type(Cypress.config("password"));
    cy.get(".btn-primary").contains("Login").click();
  });

  it("should add a fuel expense to the car", () => {
    expensesPage.addFuelExpense(
      "Audi TT",
      "28.11.2024",
      "20000",
      "50L",
      "100.00 USD"
    );
    // Перевірка, чи з’явилась витрата
    cy.get(".panel-page").within(() => {
      cy.contains("Audi TT").should("be.visible"); // Перевірка наявності тексту з назвою авто
      cy.contains("20000").should("be.visible"); // Перевірка пробігу
      cy.contains("50L").should("be.visible"); // Перевірка кількості літрів
      cy.contains("100.00 USD").should("be.visible"); // Перевірка витрат
    });
  });
});
