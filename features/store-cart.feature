@store @cart
Feature: Automation Test Store Cart

  Background:
    Given the cart is empty

  @smoke
  Scenario: Adding a product displays it in the cart
    When I navigate to product 50
    And I add the product to the cart
    Then the cart should contain "Skinsheen Bronzer Stick"
    And the cart should have 1 item

  Scenario: Removing a product from the cart empties the cart
    Given I have added product 50 to the cart
    When I remove product 50 from the cart
    Then the cart should be empty

  Scenario: Updating the quantity reflects the new value
    Given I have added product 50 to the cart
    When I update the quantity of product 50 to 3
    Then the quantity of product 50 should be "3"

  Scenario: Empty cart shows the empty-cart message
    When I navigate to the cart page
    Then the cart should be empty
