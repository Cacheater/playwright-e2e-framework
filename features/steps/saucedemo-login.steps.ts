import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

const { Given, When, Then } = createBdd();

Given('I am on the SauceDemo login page', async ({ page }) => {
  await new LoginPage(page).goto();
});

When('I log in as {string} with password {string}', async ({ page }, username: string, password: string) => {
  await new LoginPage(page).loginAs(username, password);
});

Then('I should see the products inventory page', async ({ page }) => {
  await new InventoryPage(page).expectLoaded();
});

Then('the inventory should contain at least one product', async ({ page }) => {
  expect(await new InventoryPage(page).productCount()).toBeGreaterThan(0);
});

Then('I should see the login error {string}', async ({ page }, message: string) => {
  await new LoginPage(page).expectError(message);
});
