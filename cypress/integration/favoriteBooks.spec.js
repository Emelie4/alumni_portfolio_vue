describe("favoriteBooks", () => {
  it("can navigate to favoriteBooks and back", () => {
    cy.clearLocalStorage();
    cy.visit("/");

    cy.get(".nav-link").contains("Favorite Books").click();

    cy.intercept("POST", "/api/v1/login", { fixture: "loginResponse" }).as(
      "login"
    );
    cy.intercept("GET", "/api/v1/books?page=1", { fixture: "getBooks" }).as(
      "getBooks"
    );
    cy.get("#inputEmail").type("demo_user@test.com");
    cy.get("#inputPassword").type("p@ssw@rd");
    cy.get("#loginButton").click();

    cy.wait("@login");
    cy.wait("@getBooks");

    cy.get("h1").contains("Favorite Books");

    cy.get(".img-profile").click();
    cy.get("h1").contains("Alumni Portfolio");
  });
});
