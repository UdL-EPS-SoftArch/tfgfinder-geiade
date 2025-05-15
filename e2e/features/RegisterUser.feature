Feature: Register User
  In order to use the app
  As a user
  I want to register myself and get an account

  Scenario Outline: Register new <type> user
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "<type>" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | <username>    |
      | email    | <email>       |
      | password | <password>    |
    And I click the "Submit" button
    Then I'm logged in as user "<username>"

    Examples:
      | type      | username | email           | password |
      | student   | user1    | user1@demo.app  | password |
      | professor | user2    | user2@demo.app  | password |

  Scenario: Register organisation
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "organisation" from the registration type options
    And I fill the form with
      | FIELD       | VALUE              |
      | name        | Org Test           |
      | website     | https://org.com    |
      | username    | orguser            |
      | email       | org@org.com        |
      | password    | password           |
    And I click the "Submit" button
    Then I see the login page

  Scenario: Register existing username
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | user1         |
      | email    | userx@demo.app |
      | password | password      |
    And I click the "Submit" button
    Then I see error message "Unique index or primary key violation"

  Scenario: Register user when already authenticated
    Given I'm in the homepage
    And I log in as "user1" with password "password"
    Then The "Register" menu is not present

  Scenario: Register user with empty password
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | usertemp      |
      | email    | temp@demo.app |
    Then The "Submit" button is disabled

  Scenario: Register user with empty email
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | usertemp      |
      | password | password      |
    Then The "Submit" button is disabled

  Scenario: Register user with invalid email
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | usertemp      |
      | email    | invalidemail  |
      | password | password      |
    Then The "Submit" button is disabled
    And I see input field feedback message "An e-mail is required"

  Scenario: Register user with password shorter than 8 characters
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | shortpass     |
      | email    | short@demo.app |
      | password | pass          |
    Then The "Submit" button is disabled

  Scenario: Register user with an existing email
    Given I'm in the homepage
    And I'm not logged in
    When I click the "Register" menu
    And I select "student" from the registration type options
    And I fill the form with
      | FIELD    | VALUE         |
      | username | uniqueuser    |
      | email    | user1@demo.app |
      | password | password      |
    And I click the "Submit" button
    Then I see error message "Unique index or primary key violation"
