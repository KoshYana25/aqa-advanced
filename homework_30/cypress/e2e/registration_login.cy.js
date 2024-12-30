// cypress/support/commands.js
Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // Вимкнути логування за замовчуванням
      options.log = false;
  
      // Створити власний лог із замаскованим текстом
      Cypress.log({
        $el: element,
        name: "type",
        message: "*".repeat(text.length),
      });
    }
  
    return originalFn(element, text, options);
  });
  
  // cypress/integration/registration_tests.spec.js
  describe("Registration Functionality Tests", () => {
    beforeEach(() => {
      cy.visit("https://qauto.forstudy.space/", {
        auth: {
          username: "guest",
          password: "welcome2qauto",
        },
      });
  
      cy.get("button.btn-outline-white.header_signin")
        .contains("Sign In")
        .click();
    });
  
    it("Should display errors for empty mandatory fields", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupName"]').click();
      cy.get('input[id="signupLastName"]').click();
      cy.get('input[id="signupEmail"]').click();
      cy.get('input[id="signupPassword"]').click();
      cy.get('input[id="signupRepeatPassword"]').click();
      cy.get('input[id="signupName"]').click();
  
      cy.get('input[id="signupName"]')
        .should("have.css", "border-color", "rgb(220, 53, 69)")
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Name required");
  
      cy.get('input[id="signupLastName"]')
        .should("have.css", "border-color", "rgb(220, 53, 69)")
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Last name required");
  
      cy.get('input[id="signupEmail"]')
        .should("have.css", "border-color", "rgb(220, 53, 69)")
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Email required");
  
      cy.get('input[id="signupPassword"]')
        .should("have.css", "border-color", "rgb(220, 53, 69)")
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Password required");
  
      cy.get('input[id="signupRepeatPassword"]')
        .should("have.css", "border-color", "rgb(220, 53, 69)")
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Re-enter password required");
    });
  
    it("Should validate the name and last name fields", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupName"]').type("A").blur();
      cy.get('input[id="signupName"]')
        .siblings(".invalid-feedback")
        .should("contain", "Name has to be from 2 to 20 characters long");
  
      cy.get('input[id="signupLastName"]').type("A".repeat(21)).blur();
      cy.get('input[id="signupLastName"]')
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Last name has to be from 2 to 20 characters long");
    });
  
    it("Should validate the email field", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupEmail"]').type("invalidemail").blur();
      cy.get('input[id="signupEmail"]')
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Email is incorrect");
    });
  
    it("Should validate the password field", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupPassword"]')
        .type("Short1", { sensitive: true })
        .blur();
      cy.get('input[id="signupPassword"]')
        .siblings(".invalid-feedback")
        .find("p")
        .should(
          "contain",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        );
  
      cy.get('input[id="signupPassword"]')
        .clear()
        .type("lowercase1", { sensitive: true })
        .blur();
      cy.get('input[id="signupPassword"]')
        .siblings(".invalid-feedback")
        .find("p")
        .should(
          "contain",
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        );
    });
  
    it("Should validate the re-enter password field", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupPassword"]').type("ValidPass1", {
        sensitive: true,
      });
      cy.get('input[id="signupRepeatPassword"]')
        .type("DifferentPass1", { sensitive: true })
        .blur();
      cy.get('input[id="signupRepeatPassword"]')
        .siblings(".invalid-feedback")
        .find("p")
        .should("contain", "Passwords do not match");
    });
  
    it("Should successfully register with valid data", () => {
      cy.get("button").contains("Registration").click();
      cy.get('input[id="signupName"]').type("Yana");
      cy.get('input[id="signupLastName"]').type("Koshelia");
      cy.get('input[id="signupEmail"]').type("yana9941@gmail.com");
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
      cy.visit("https://qauto.forstudy.space/", {
        auth: {
          username: "guest",
          password: "welcome2qauto",
        },
      });
  
      cy.get("button.btn-outline-white.header_signin")
        .contains("Sign In")
        .click();
  
      cy.get('input[id="signinEmail"]').type("yana232@gmail.com");
      cy.get('input[id="signinPassword"]').type("ValidPass1", {
        sensitive: true,
      });
      cy.get("button").contains("Login").click();
  
      cy.get('button[id="userNavDropdown"]').should("contain", "My profile");
    });
  });
  