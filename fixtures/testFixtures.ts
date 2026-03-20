import { test as base } from '@playwright/test';
import { LoginPage, ProductPage, CartPage, HomePage } from '../pages';

export const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  homePage: HomePage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
