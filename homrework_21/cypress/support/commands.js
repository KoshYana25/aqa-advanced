Cypress.Commands.add(
  "createExpense",
  (carId, reportedAt, mileage, liters, totalCost) => {
    cy.intercept("POST", "/api/expenses").as("createExpense");

    cy.request({
      method: "POST",
      url: "/api/expenses",
      headers: {
        Authorization: "Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==",
        Cookie: `sid=${cookie.value}`
      },
      body: {
        reportedAt: "2024-12-02",
        mileage: 15000,
        liters: 60,
        totalCost: 120,
        forceMileage: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.wait("@createExpense").its("response.statusCode").should("eq", 200);
  }
);
