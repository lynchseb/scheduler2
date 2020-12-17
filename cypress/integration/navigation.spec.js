describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  // it("should navigate to Tuesday", () => {
  //   cy.visit("/");
  //   cy.get("li")
  //   cy.contains("li", "Tuesday")
  //   .click()
  //   .should("have.css", "background-color", "rgb(242, 242, 242)");

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});