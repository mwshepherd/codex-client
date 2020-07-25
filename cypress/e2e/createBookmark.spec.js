import { bookmarkBuilder } from '../support/generate'

describe("when adding text to make a new bookmark user", () => {
  beforeEach(() => {
    cy.fixture("user").then((user) => {
      window.localStorage.setItem("token", user.jwt);
      window.localStorage.setItem("auth", true)
    });
  });

  it("should be able to submit the form and be redirected to the /bookmarks page", () => {
    const bookmark = bookmarkBuilder()
    cy.visit("dashboard/bookmarks");
    cy.findByPlaceholderText(/title/i).should("contain.value", title)
    // cy.findByPlaceholderText(/Title/i).type(bookmark.title);
    // cy.findByPlaceholderText(/URL/i).type(bookmark.url);
    // cy.findByPlaceholderText(/Description/i).type(bookmark.description);
    // cy.findByLabelText(/Category/).type(bookmark.category);
    //   cy.visit("/bookmarks/");

    //   cy.typeInBookmarkDetails(title, url, description)
    cy.get('form').submit()
    .url()
    .should('eq', 'http://localhost:8080/dashboard/bookmarks')
    // })
  });
});


// cy.get(this.dropdownlocactor).contains(optiontext)
//   .then(element => {
//     var text = element.text();
//     cy.get(this.dropdownlocator).select(text);
// });