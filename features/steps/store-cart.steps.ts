import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

const { Given, When, Then } = createBdd();

Given('the cart is empty', async ({ page }) => {
  await new CartPage(page).emptyCart();
});

Given('I have added product {int} to the cart', async ({ page }, productId: number) => {
  const cart = new CartPage(page);
  await cart.emptyCart();
  const product = new ProductPage(page);
  await product.goto(productId);
  await product.addToCart();
});

When('I navigate to product {int}', async ({ page }, productId: number) => {
  await new ProductPage(page).goto(productId);
});

When('I add the product to the cart', async ({ page }) => {
  await new ProductPage(page).addToCart();
});

When('I remove product {int} from the cart', async ({ page }, productId: number) => {
  await new CartPage(page).removeProduct(productId);
});

When('I update the quantity of product {int} to {int}', async ({ page }, productId: number, qty: number) => {
  await new CartPage(page).updateQuantity(productId, qty);
});

When('I navigate to the cart page', async ({ page }) => {
  await new CartPage(page).goto();
});

Then('the cart should contain {string}', async ({ page }, productName: string) => {
  await new CartPage(page).expectProduct(productName);
});

Then('the cart should have {int} item', async ({ page }, count: number) => {
  expect(await new CartPage(page).getRowCount()).toBe(count);
});

Then('the cart should be empty', async ({ page }) => {
  await new CartPage(page).expectEmpty();
});

Then('the quantity of product {int} should be {string}', async ({ page }, productId: number, qty: string) => {
  expect(await new CartPage(page).getQuantity(productId)).toBe(qty);
});
