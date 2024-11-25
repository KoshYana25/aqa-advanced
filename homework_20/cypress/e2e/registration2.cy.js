describe("Registration Functionality Tests", () => {
  beforeEach(() => {
    cy.visit("https://qauto2.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get("button.btn-outline-white.header_signin")
      .contains("Sign In")
      .click();
  });

  it("Should successfully register with valid data", () => {
    cy.get("button").contains("Registration").click();
    cy.get('input[id="signupName"]').type("Yana");
    cy.get('input[id="signupLastName"]').type("Koshelia");
    cy.get('input[id="signupEmail"]').type("yana126@gmail.com");
    cy.get('input[id="signupPassword"]').type("ValidPass1", {
      sensitive: true,
    });
    cy.get('input[id="signupRepeatPassword"]').type("ValidPass1", {
      sensitive: true,
    });

    cy.get("button").contains("Register").click();
    cy.get('button[id="userNavDropdown"]').should("contain", "My profile");
  });

  it("Should successfully log in with valid credentials", () => {
    cy.visit("https://qauto2.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get("button.btn-outline-white.header_signin")
      .contains("Sign In")
      .click();

    cy.get('input[id="signinEmail"]').type("yana126@gmail.com");
    cy.get('input[id="signinPassword"]').type("ValidPass1", {
      sensitive: true,
    });
    cy.get("button").contains("Login").click();

    cy.get('button[id="userNavDropdown"]').should("contain", "My profile");
  });
});
