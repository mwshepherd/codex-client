import { userBuilder } from '../support/generate'

describe("when clicking on login from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").click();
  });

  it("should load a login popup", () => {
    cy.url().should("include", "/");
  });

  it("should have a button to login", () => {
    cy.get("button").should("contain.text", "Login");
  });

  it("the email input should be visible", () => {
    cy.get("#email").should("be.visible")
  });

  it("the password input should be visible", () => {
    cy.get("#password").should("be.visible")
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder()
    cy.findByPlaceholderText(/email/i).type(email).should("contain.value", email)
    cy.findByPlaceholderText(/password/i).type(password).should("contain.value", password)
  })
});

describe("with the correct login credentials user", () => {
  before(() => {
    cy.fixture("user").then((user) => {
      cy.visit("/")
      cy.get("button").click();
      cy.findByPlaceholderText(/email/i).type(user.email)
      cy.findByPlaceholderText(/password/i).type(user.password)
    })
  });
      
  it("should be able to click on submit and be navigated to /dashboard", () => {
    cy.get("form").submit()
    cy.url().should('eql', "http://localhost:8080/dashboard")
    .window().its('localStorage.token').should('be.a', 'string')
  });
      
  after(() => {
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});