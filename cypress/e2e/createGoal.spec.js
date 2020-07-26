import { goalBuilder } from '../support/generate'

describe("when adding data to make a new goal", () => {
  beforeEach(() => {
    cy.fixture("user").then((user) => {
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("auth", true)
    });
  });

  it("should be able to submit the form and be remain on the /goals page", () => {
    const goal = goalBuilder()
    cy.visit("dashboard/goals");
    cy.url().should("include", "dashboard/goals");
    cy.get("#title").should("be.visible")
    cy.findByPlaceholderText(/Goal/i).type(goal.title).should("contain.value", goal.title)
    cy.findByPlaceholderText(/Details/i).type(goal.body).should("contain.value", goal.body)
    cy.get('#due_date').type('2021-01-01')
    cy.get('#categories').select('Front End').should("have.value", '1') 
    cy.get('#languages').select('JavaScript').should("have.value", '1') 
    cy.get('form').submit()
    .url()
    .should('contain', 'http://localhost:8080/dashboard/goals')
    })
});
