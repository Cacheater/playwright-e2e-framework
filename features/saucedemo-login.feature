@saucedemo @login
Feature: SauceDemo Authentication

  Background:
    Given I am on the SauceDemo login page

  @smoke
  Scenario: A valid user lands on the products page
    When I log in as "standard_user" with password "secret_sauce"
    Then I should see the products inventory page
    And the inventory should contain at least one product

  Scenario: A locked-out user is rejected with a clear error
    When I log in as "locked_out_user" with password "secret_sauce"
    Then I should see the login error "Epic sadface: Sorry, this user has been locked out."
