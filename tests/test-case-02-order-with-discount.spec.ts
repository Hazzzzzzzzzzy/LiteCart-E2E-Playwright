import { test, expect } from '../fixtures/testFixtures';
import { URLS, PRODUCTS } from '../data/testData';
import { loginAndClearCart } from '../helpers';

test.describe('TC-02: Заказ товара со скидкой', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginAndClearCart(page, loginPage);
  });

  test('логин, yellow duck x2, оформление', async ({ productPage, cartPage }) => {
    await productPage.goto(URLS.yellowDuck);
    await productPage.addToCart(2);

    await cartPage.goto();
    const items = await cartPage.getCartItems();

    const item = items.find((i) => i.name.toLowerCase().includes('yellow'));
    expect(item).toBeDefined();
    expect(item!.quantity).toBe(2);
    expect(item!.price).toBe(PRODUCTS.yellowDuck.price);
    expect(item!.total).toBe(PRODUCTS.yellowDuck.price * 2);

    await cartPage.confirmOrder();
    expect(await cartPage.isOrderSuccess()).toBe(true);
  });
});
