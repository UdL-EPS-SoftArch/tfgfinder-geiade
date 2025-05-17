import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given("I'm in the homepage", () => {
  cy.visit('http://localhost:4200');
});

Given("I'm not logged in", () => {
  cy.get('.nav-link').contains('Login');
});

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

When("I fill the form with", (table: DataTable) => {
  table.rows().forEach(([field, value]) => {
    const selector = `[name="${field}"], #${field}`;
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

Then("I see user {string} in the user list", (username: string) => {
  cy.url({ timeout: 10000 }).should('include', '/users');

  cy.get('.user-list', { timeout: 10000 })
    .find('a.card-text')
    .contains(username)
    .should('be.visible');
});



Then("I see error message {string}", (message: string) => {
  cy.get('.alert')
    .should('be.visible')
    .invoke('text')
    .should('include', message);
});

Then("The {string} button is disabled", (label: string) => {
  cy.get('button').contains(label, { timeout: 5000 })
    .should('be.disabled');
});

Then("The {string} menu is not present", (option: string) => {
  cy.get('.nav-link').contains(option)
    .should('not.exist');
});

Then("I see input field feedback message {string}", (message: string) => {
  cy.get('.invalid-feedback', { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', message);
});
