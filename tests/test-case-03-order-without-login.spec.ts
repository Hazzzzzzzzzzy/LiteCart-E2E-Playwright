import { test, expect } from '../fixtures/testFixtures';
import { URLS, PRODUCTS } from '../data/testData';
import { ensureEmptyCart } from '../helpers';

test.describe('TC-03: Заказ без логина', () => {
  test.beforeEach(async ({ page }) => {
    await ensureEmptyCart(page);
  });

  test('два товара, сумма, email пустой, recently viewed', async ({
    page,
    productPage,
    cartPage,
    homePage,
  }) => {
    await productPage.goto(URLS.greenDuck);
    await productPage.addToCart(1);

    await productPage.goto(URLS.redDuck);
    await productPage.addToCart(1);

    await cartPage.goto();
    const items = await cartPage.getCartItems();

    expect(items).toHaveLength(2);

    const expectedTotal = PRODUCTS.greenDuck.price + PRODUCTS.redDuck.price;
    const actualTotal = items.reduce((sum, i) => sum + i.total, 0);
    expect(actualTotal).toBe(expectedTotal);

    await expect(page.locator('input[name="email"]')).toHaveValue('');

    await homePage.goto();
    await expect(homePage.getRecentlyViewedLocator()).toBeVisible({
      timeout: 5000,
    });

    const recentNames = await homePage.getRecentlyViewedProductNames();
    const hasViewedProducts = recentNames.some(
      (n) => n.toLowerCase().includes('green') || n.toLowerCase().includes('red')
    );
    expect(hasViewedProducts || recentNames.length > 0).toBe(true);
  });
});
