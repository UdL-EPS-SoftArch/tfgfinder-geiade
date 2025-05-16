Feature: Register all user types
  In order to use the application
  As a new user (Student, Professor, External or Organisation)
  I want to register myself and log in automatically

  Background:
    Given I'm in the homepage
    And I'm not logged in

  # --- STUDENT ---

  Scenario: Register new student successfully
    Given I go to the student registration page
    When I fill the form with
      | FIELD        | VALUE             |
      | id           | student1          |
      | email        | student@demo.app  |
      | password     | password123       |
      | name         | Alice             |
      | surname      | Smith             |
      | dni          | 12345678A         |
      | address      | Fake St 123       |
      | municipality | Lleida            |
      | postalCode   | 25001             |
      | phoneNumber  | 123456789         |
      | degree       | Informatics       |
    And I click the "Submit" button
    Then I'm logged in as user "student1"

  Scenario: Register student with invalid DNI
    Given I go to the student registration page
    When I fill the form with
      | FIELD        | VALUE             |
      | id           | student2          |
      | email        | invalid@x.com     |
      | password     | password123       |
      | name         | Bob               |
      | surname      | Smith             |
      | dni          | 1234              |
      | address      | Street            |
      | municipality | Lleida            |
      | postalCode   | 25001             |
      | phoneNumber  | 123456789         |
      | degree       | Math              |
    Then The "Submit" button is disabled
    And I see input field feedback message "The DNI must have 8 digits followed by a letter"

  # --- PROFESSOR ---

  Scenario: Register new professor successfully
    Given I go to the professor registration page
    When I fill the form with
      | FIELD      | VALUE             |
      | id         | prof1             |
      | email      | prof@demo.app     |
      | password   | password123       |
      | name       | Eva               |
      | surname    | Llatra            |
      | faculty    | EPS               |
      | department | IT                |
    And I click the "Submit" button
    Then I'm logged in as user "prof1"

  Scenario: Register professor with missing department
    Given I go to the professor registration page
    When I fill the form with
      | FIELD    | VALUE             |
      | id       | prof2             |
      | email    | p2@demo.app       |
      | password | password123       |
      | name     | Marta             |
      | surname  | Blai              |
      | faculty  | EPS               |
    Then The "Submit" button is disabled

  # --- EXTERNAL / ORGANISATION ---
# Cambiar "company" → "organization", "contact" → "email", "phone" → "phoneNumber"

  Scenario: Register new external user successfully
    Given I go to the external registration page
    When I fill the form with
      | FIELD        | VALUE              |
      | id           | ext1               |
      | email        | ext@demo.app       |
      | password     | password123        |
      | name         | Alex               |
      | surname      | Ruiz               |
      | organization | External Corp      |
      | position     | Recruiter          |
      | address      | Street 1           |
      | municipality | Lleida             |
      | postalCode   | 25001              |
      | phoneNumber  | 987654321          |
    And I click the "Submit" button
    Then I'm logged in as user "ext1"



  Scenario: Register external user with existing id
    Given I go to the external registration page
    When I fill the form with
      | FIELD        | VALUE              |
      | id           | ext1               |
      | email        | ext2@demo.app      |
      | password     | password123        |
      | name         | Alex               |
      | surname      | Ruiz               |
      | position     | Manager            |
      | organization | Another Corp       |
      | address      | Another St         |
      | municipality | Lleida             |
      | postalCode   | 25002              |
      | phoneNumber  | 987654321          |
    And I click the "Submit" button
    Then I see error message "Unique index or primary key violation"

  Scenario: Register organisation with invalid phone
    Given I go to the organisation registration page
    When I fill the form with
      | FIELD        | VALUE             |
      | id           | org2              |
      | email        | org2@demo.app     |
      | password     | password123       |
      | name         | Org 2             |
      | address      | Another St 45     |
      | email        | person@org.com    |
      | phoneNumber  | 1234              |
    Then The "Submit" button is disabled
    And I see input field feedback message "The phone number must contain exactly 9 digits"
