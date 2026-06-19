import { test, expect } from '@playwright/test';
import { StoreLoginPage } from '../pages/StoreLoginPage';
import { AccountPage } from '../pages/AccountPage';

// Set STORE_USER and STORE_PASSWORD env vars to match your registered test account.
const TEST_USER = process.env.STORE_USER ?? 'test_user';
const TEST_PASS = process.env.STORE_PASSWORD ?? 'Test@123';

test.describe('Automation Test Store – Login', () => {
  test.beforeEach(() => {
    test.skip(!!process.env.CI, 'Automation Test Store is unreachable from CI runners.');
  });

  test('a valid user logs in and lands on the account dashboard', async ({ page }) => {
    test.skip(
      TEST_USER === 'test_user',
      'Requires a real account — set STORE_USER and STORE_PASSWORD env vars.'
    );

    const login = new StoreLoginPage(page);
    const account = new AccountPage(page);

    await login.goto();
    await login.loginAs(TEST_USER, TEST_PASS);

    await account.expectLoaded();
    await expect(account.editAccountLink).toBeVisible();
  });

  test('an invalid user is rejected with a clear error', async ({ page }) => {
    const login = new StoreLoginPage(page);

    await login.goto();
    await login.loginAs('invalid_user', 'wrongpassword');

    await login.expectError('Incorrect login or password provided.');
  });

  test('login page shows both the returning-customer form and the new-customer option', async ({ page }) => {
    const login = new StoreLoginPage(page);

    await login.goto();

    await expect(login.loginName).toBeVisible();
    await expect(login.password).toBeVisible();
    await expect(login.loginButton).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Returning Customer', exact: true })).toBeVisible();
  });
});
