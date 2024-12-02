import { expensesPage } from "../pageObjects/expenses.page";

describe("Expenses Tests", () => {
  let carId;

  before(() => {
    // Завантажуємо carId з фікстури
    cy.fixture('carId').then((data) => {
      carId = data.carId;
    });
  });

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

    cy.get('input[id="signinEmail"]').type(Cypress.config("email"));
    cy.get('input[id="signinPassword"]').type(Cypress.config("password"));
    cy.get(".btn-primary").contains("Login").click();
  });

  it("should create an expense via API and validate it via UI", () => {
    const testExpense = {
      reportedAt: "2024-12-02",
      mileage: 15000,
      liters: 60,
      totalCost: 120,
    };

    cy.createExpense(carId, testExpense.reportedAt, testExpense.mileage, testExpense.liters, testExpense.totalCost)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('ok');
        cy.log("Created Expense ID:", response.body.data.id);
      });

    // Перевірка через UI
    expensesPage.addFuelExpense(
      "Audi TT",
      testExpense.reportedAt,
      testExpense.mileage.toString(),
      `${testExpense.liters}L`,
      `${testExpense.totalCost}.00 USD`
    );

    cy.get(".panel-page").within(() => {
      cy.contains("Audi TT").should("be.visible");
      cy.contains(testExpense.mileage.toString()).should("be.visible");
      cy.contains(`${testExpense.liters}L`).should("be.visible");
      cy.contains(`${testExpense.totalCost}.00 USD`).should("be.visible");
    });
  });
});
