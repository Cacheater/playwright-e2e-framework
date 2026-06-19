import { Page, Locator, expect } from '@playwright/test';

export class StoreLoginPage {
  readonly page: Page;
  readonly loginName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginName = page.locator('#loginFrm_loginname');
    this.password = page.locator('#loginFrm_password');
    this.loginButton = page.locator('button[title="Login"]');
    this.errorAlert = page.locator('.alert-error');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationteststore.com/index.php?rt=account/login');
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.loginName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorAlert).toContainText(message);
  }
}
