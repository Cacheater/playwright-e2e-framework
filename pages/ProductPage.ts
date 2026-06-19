import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1').first();
    this.price = page.locator('.productfilneprice');
    this.quantity = page.locator('#product_quantity');
    this.addToCartButton = page.locator('a.cart');
  }

  async goto(productId: number): Promise<void> {
    await this.page.goto(
      `https://automationteststore.com/index.php?rt=product/product&product_id=${productId}`
    );
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantity.fill(String(qty));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getTitle(): Promise<string> {
    return this.title.innerText();
  }
}
