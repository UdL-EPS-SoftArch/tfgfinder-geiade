import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given("I'm in the homepage", () => {
  cy.visit('http://localhost:4200');
});

Given("I'm not logged in", () => {
  cy.get('.nav-link').contains('Login');
});

Given("I log in as {string} with password {string}", (id, password) => {
  cy.get('.nav-link').contains('Login').click();
  cy.get('#id').type(id).blur();
  cy.get('#password').type(password).blur();
  cy.get('button').contains('Submit').click();
});

// === Navegar a las páginas de registro según tipo ===

Given("I go to the student registration page", () => {
  cy.visit('http://localhost:4200/register-student');
});

Given("I go to the professor registration page", () => {
  cy.visit('http://localhost:4200/register-professor');
});

Given("I go to the external registration page", () => {
  cy.visit('http://localhost:4200/register-organisation');
});

Given("I go to the organisation registration page", () => {
  cy.visit('http://localhost:4200/register-organisation');
});

// === Rellenar formularios dinámicamente ===

When("I fill the form with", (table: DataTable) => {
  table.rows().forEach(([field, value]) => {
    const selector = `[name="${field}"], #${field}`; // Cubrir tanto name como id
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(value)
      .blur();
  });
});

When("I click the {string} button", (label) => {
  const id = label.toLowerCase() === 'register' || label.toLowerCase() === 'submit'
    ? '#submit-button'
    : '#cancel-button';
  cy.get(id, { timeout: 10000 }).should('be.visible').click();
});


// === Validaciones de login y mensajes ===
/*
Then("I'm logged in as user {string}", (id) => {
  cy.get('#currentUser a.nav-link', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', id);
});
*/

Then("I'm logged in as user {string}", (id) => {
  cy.window().then((win) => {
    const storedUser = win.localStorage.getItem('currentUser');
    if (!storedUser) {
      throw new Error('No currentUser found in localStorage');
    }
    const user = JSON.parse(storedUser);
    expect(user.id).to.equal(id);
  });
});




Then("I see error message {string}", (message) => {
  cy.get('.alert')
    .should('be.visible')
    .invoke('text')
    .should('contains', message);
});

Then("The {string} button is disabled", (label) => {
  cy.get('button').contains(label, { timeout: 5000 })
    .should('be.disabled');
});

Then("The {string} menu is not present", (option) => {
  cy.get('.nav-link').contains(option)
    .should('not.exist');
});

Then("I see input field feedback message {string}", (message) => {
  cy.get('.invalid-feedback')
    .should('be.visible')
    .invoke('text')
    .should('contains', message);
});

Then("I'm redirected to the About page", () => {
  cy.url().should('include', '/about');
});

