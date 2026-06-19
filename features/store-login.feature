@store @login
Feature: Automation Test Store Login

  Background:
    Given I am on the Store login page

  @smoke @requiresAccount
  Scenario: A valid user logs in and lands on the account dashboard
    When I log in to the store as a registered user
    Then I should land on the account dashboard
    And the "Edit account details" link should be visible

  Scenario: An invalid user is rejected with a clear error
    When I log in to the store as "invalid_user" with password "wrongpassword"
    Then I should see the store error "Incorrect login or password provided."

  Scenario: Login page shows the returning-customer form
    Then the login name field should be visible
    And the password field should be visible
    And the login button should be visible
    And the "Returning Customer" heading should be visible
