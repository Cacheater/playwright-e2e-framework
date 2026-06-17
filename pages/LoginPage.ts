import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the SauceDemo login screen.
 * Keeps locators and actions in one place so specs read like user intent.
 */
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.error = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.error).toHaveText(message);
  }
}
