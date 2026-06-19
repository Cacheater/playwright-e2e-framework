import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { StoreLoginPage } from '../../pages/StoreLoginPage';
import { AccountPage } from '../../pages/AccountPage';

const { Before, Given, When, Then } = createBdd();

const TEST_USER = process.env.STORE_USER ?? 'test_user';
const TEST_PASS = process.env.STORE_PASSWORD ?? 'Test@123';

Before({ tags: '@requiresAccount' }, async ({ $testInfo }) => {
  if (TEST_USER === 'test_user') {
    $testInfo.skip(true, 'Set STORE_USER and STORE_PASSWORD env vars.');
  }
});

Given('I am on the Store login page', async ({ page }) => {
  await new StoreLoginPage(page).goto();
});

When('I log in to the store as a registered user', async ({ page }) => {
  await new StoreLoginPage(page).loginAs(TEST_USER, TEST_PASS);
});

When('I log in to the store as {string} with password {string}', async ({ page }, username: string, password: string) => {
  await new StoreLoginPage(page).loginAs(username, password);
});

Then('I should land on the account dashboard', async ({ page }) => {
  await new AccountPage(page).expectLoaded();
});

Then('the {string} link should be visible', async ({ page }, linkText: string) => {
  await expect(page.getByRole('link', { name: linkText })).toBeVisible();
});

Then('I should see the store error {string}', async ({ page }, message: string) => {
  await new StoreLoginPage(page).expectError(message);
});

Then('the login name field should be visible', async ({ page }) => {
  await expect(new StoreLoginPage(page).loginName).toBeVisible();
});

Then('the password field should be visible', async ({ page }) => {
  await expect(new StoreLoginPage(page).password).toBeVisible();
});

Then('the login button should be visible', async ({ page }) => {
  await expect(new StoreLoginPage(page).loginButton).toBeVisible();
});

Then('the {string} heading should be visible', async ({ page }, headingName: string) => {
  await expect(page.getByRole('heading', { name: headingName, exact: true })).toBeVisible();
});
