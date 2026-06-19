import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly updateButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('table.table-striped');
    this.updateButton = page.locator('#cart_update');
    this.checkoutButton = page.locator('#cart_checkout1');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationteststore.com/index.php?rt=checkout/cart');
  }

  async emptyCart(): Promise<void> {
    await this.goto();
    let removeButtons = this.page.locator('a[href*="remove="]');
    while ((await removeButtons.count()) > 0) {
      await removeButtons.first().click();
      removeButtons = this.page.locator('a[href*="remove="]');
    }
  }

  async expectEmpty(): Promise<void> {
    await expect(this.page.locator('.contentpanel')).toContainText('Your shopping cart is empty!');
  }

  async expectProduct(productName: string): Promise<void> {
    await expect(this.cartTable.locator(`a:has-text("${productName}")`)).toBeVisible();
  }

  async removeProduct(productId: number): Promise<void> {
    await this.page.goto(
      `https://automationteststore.com/index.php?rt=checkout/cart&remove=${productId}`
    );
  }

  async updateQuantity(productId: number, qty: number): Promise<void> {
    await this.page.locator(`#cart_quantity${productId}`).fill(String(qty));
    await this.updateButton.click();
  }

  async getQuantity(productId: number): Promise<string> {
    return this.page.locator(`#cart_quantity${productId}`).inputValue();
  }

  async getRowCount(): Promise<number> {
    return this.page.locator('a[href*="remove="]').count();
  }
}
