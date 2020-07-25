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
    cy.visit("/bookmarks/");

    // cy.getUser().then((user) => {
    //   cy.login(user.email, user.password)
    //   const { title, url, description, category_id, language_id } = bookmarkBuilder()
    //   cy.visit("/bookmarks/");

    //   cy.typeInBookmarkDetails(title, url, description)
    //   cy.get('form').submit()
    //   .url()
    //   .should('eq', 'http://localhost:8080/bookmarks')
    // })
  });
});