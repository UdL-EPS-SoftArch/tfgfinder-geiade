import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given("I'm in the homepage", () => {
  cy.visit('http://localhost:4200');
});

Given("I'm not logged in", () => {
  cy.get('.nav-link').contains('Login');
});

Given("I log in as {string} with password {string}", (username, password) => {
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type(username).blur();
  cy.get('#password').type(password).blur();
  cy.get('button').contains('Submit').click();
});

Given("I click the {string} menu", (option) => {
  cy.get('.nav-link').contains(option).click();
});

When("I select {string} from the registration type options", (type: string) => {
  cy.contains('button', new RegExp(type, 'i')).click();
});

When("I fill the form with", (table: DataTable) => {
  table.rows().forEach((row: string[]) => {
    const field = row[0];
    const value = row[1];
    cy.get('#' + field.toLowerCase(), { timeout: 10000 }) // Espera hasta 10s
      .should('be.visible') // Asegura visibilidad
      .clear()
      .type(value)
      .blur();
  });
});



When("I click the {string} button", (label) => {
  cy.get('button').contains(label).click();
});

Then("I'm logged in as user {string}", (username) => {
  cy.get('#currentUser')
    .invoke('text')
    .should('contains', username);
});

Then("I see error message {string}", (message) => {
  cy.get('.alert')
    .invoke('text')
    .should('contains', message);
});

Then("The {string} button is disabled", (label) => {
  cy.get('button').contains(label)
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

Then("I see the login page", () => {
  cy.url().should('include', '/login');
  cy.contains('Login');
});

