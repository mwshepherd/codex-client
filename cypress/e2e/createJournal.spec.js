import { journalBuilder } from '../support/generate'

describe("when adding text to make a new journal entry", () => {
  beforeEach(() => {
    cy.fixture("user").then((user) => {
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("auth", true)
    });
  });

  it("should be able to submit the form and redirect to the journal view page", () => {
    const journal = journalBuilder()
    cy.visit("dashboard/journals/new");
    cy.url().should("include", "dashboard/journals/new");
    cy.get("#title").should("be.visible")
    cy.findByPlaceholderText(/Title/i).type(journal.title).should("contain.value", journal.title)
    cy.get('#journal-body').should("be.visible")
    cy.get('#journal-body').type(journal.body)
    // .should("contain.value", journal.body)

    cy.get('#categories').select('Front End').should("have.value", '1') 
    cy.get('#languages').select('JavaScript').should("have.value", '1') 
    cy.get('#post-btn').click()
    .url()
    .should('contain', 'http://localhost:8080/dashboard/journals')
    })
});
