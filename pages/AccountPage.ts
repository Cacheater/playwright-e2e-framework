import { Page, Locator, expect } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly dashboardLink: Locator;
  readonly editAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Account Dashboard' });
    this.editAccountLink = page.getByRole('link', { name: 'Edit account details' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/rt=account\/account/);
    await expect(this.dashboardLink).toBeVisible();
  }
}
