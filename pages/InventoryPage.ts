import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the product inventory shown after a successful login.
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toHaveText('Products');
  }

  async productCount(): Promise<number> {
    return this.items.count();
  }
}
