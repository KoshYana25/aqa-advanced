describe("QAuto Application Testing", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("should check visibility of header and footer buttons and links", () => {
    cy.get("a.header-link").contains("Home").click();
    cy.url().should("eq", "https://qauto.forstudy.space/");
    cy.get(".header-link").contains("About").click();
    cy.url().should("eq", "https://qauto.forstudy.space/");
    cy.get(".header-link").contains("Contacts").click();
    cy.url().should("eq", "https://qauto.forstudy.space/");

    cy.get("button.header-link.-guest")
      .contains("Guest log in")
      .should("be.visible");
    cy.get("button.btn-outline-white.header_signin")
      .contains("Sign In")
      .should("be.visible");

    cy.get("button.btn-primary").contains("Sign up").should("be.visible");

    cy.get("a.socials_link")
      .find(".icon-facebook")
      .parent()
      .should("have.attr", "href", "https://www.facebook.com/Hillel.IT.School");
    cy.get("a.socials_link")
      .find(".icon-telegram")
      .parent()
      .should("have.attr", "href", "https://t.me/ithillel_kyiv");
    cy.get("a.socials_link")
      .find(".icon-youtube")
      .parent()
      .should(
        "have.attr",
        "href",
        "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"
      );
    cy.get("a.socials_link")
      .find(".icon-instagram")
      .parent()
      .should(
        "have.attr",
        "href",
        "https://www.instagram.com/hillel_itschool/"
      );
    cy.get("a.socials_link")
      .find(".icon-linkedin")
      .parent()
      .should("have.attr", "href", "https://www.linkedin.com/school/ithillel/");

    cy.get("a.contacts_link.display-4").should(
      "have.attr",
      "href",
      "https://ithillel.ua"
    );
    cy.get("a.contacts_link.h4")
      .should("have.attr", "href", "mailto:developer@ithillel.ua")
      .and("contain", "support@ithillel.ua");
  });
});
