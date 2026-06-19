import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

// Product used across all cart tests — no login required to add to cart.
const PRODUCT_ID = 50;
const PRODUCT_NAME = 'Skinsheen Bronzer Stick';

test.describe('Automation Test Store – Cart', () => {
  test.beforeEach(() => {
    test.skip(!!process.env.CI, 'Automation Test Store is unreachable from CI runners.');
  });

  test.beforeEach(async ({ page }) => {
    const cart = new CartPage(page);
    await cart.emptyCart();
  });

  test('adding a product displays it in the cart', async ({ page }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await product.goto(PRODUCT_ID);
    await product.addToCart();

    await cart.expectProduct(PRODUCT_NAME);
    expect(await cart.getRowCount()).toBe(1);
  });

  test('removing a product from the cart empties the cart', async ({ page }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await product.goto(PRODUCT_ID);
    await product.addToCart();
    await cart.expectProduct(PRODUCT_NAME);

    await cart.removeProduct(PRODUCT_ID);

    await cart.expectEmpty();
  });

  test('updating the quantity reflects the new value', async ({ page }) => {
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await product.goto(PRODUCT_ID);
    await product.addToCart();

    await cart.updateQuantity(PRODUCT_ID, 3);

    expect(await cart.getQuantity(PRODUCT_ID)).toBe('3');
  });

  test('empty cart shows the empty-cart message', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.goto();

    await cart.expectEmpty();
  });
});
