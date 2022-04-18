describe("repoTracker", () => {
  it("can navigate to repoTracker and back", () => {
    cy.clearLocalStorage();
    cy.visit("/");

    cy.intercept("GET", "/api/v1/github_repos", { fixture: "getRepos" }).as(
      "getRepos"
    );
    cy.get(".nav-link").contains("Github Tracker").click();

    cy.wait("@getRepos");

    cy.get("select").first().select("Javascript Framework");
    cy.get("select").first().select("Fullstack Framework");
    cy.get("select").first().select("Language");

    cy.get("select").last().select("Forks");
    cy.get("select").last().select("Watchers");

    cy.get(".img-profile").click();
    cy.get("h1").contains("Alumni Portfolio");
  });
});
