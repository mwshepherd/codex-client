import { userBuilder } from "../support/generate";

describe("visiting the site as a guest", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a button to signup", () => {
    cy.contains("Sign up").should("contain.text", "Sign up");
  });

  it("should register a new user", () => {
    const user = userBuilder();
    cy.contains("Sign up").click();
    cy.findByPlaceholderText(/username/i).type(user.username)
    cy.findByPlaceholderText(/email/i).type(user.email)
    cy.findByPlaceholderText(/password/i).type(user.password)
    cy.get('form').submit()
    cy.url().should("eql", "http://localhost:8080/dashboard");
  })
})
