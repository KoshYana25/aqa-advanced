import { garagePage } from "../pageObjects/garage.page";

describe("Garage Tests", () => {
  beforeEach(() => {
    cy.fixture("qauto2").then((config) => {
      cy.visit(config.baseUrl, {
        auth: {
          username: "guest",
          password: "welcome2qauto",
        },
      });
      cy.get("button.btn-outline-white.header_signin")
        .contains("Sign In")
        .click();
      // Логін
      cy.get('input[id="signinEmail"]').type(config.email);
      cy.get('input[id="signinPassword"]').type(config.password);
      cy.get(".btn-primary").contains("Login").click();
    });
  });

  it("should add a new car to the garage", () => {
    // Використання методу для додавання машини
    garagePage.addCar("Audi", "TT", "100000");
    // Перевірка, чи з’явилась машина
    cy.contains("Audi TT").should("be.visible");
  });
});
