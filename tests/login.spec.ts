import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Authentication', () => {
  test('a valid user lands on the products page', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginAs('standard_user', 'secret_sauce');

    await inventory.expectLoaded();
    expect(await inventory.productCount()).toBeGreaterThan(0);
  });

  test('a locked-out user is rejected with a clear error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.loginAs('locked_out_user', 'secret_sauce');

    await login.expectError('Epic sadface: Sorry, this user has been locked out.');
  });
});
