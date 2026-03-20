import { test, expect } from '../fixtures/testFixtures';
import { URLS, PRODUCTS } from '../data/testData';
import { loginAndClearCart } from '../helpers';

test.describe('TC-01: Заказ товара без скидки', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginAndClearCart(page, loginPage);
  });

  test('логин, green duck x3, оформление', async ({ productPage, cartPage }) => {
    await productPage.goto(URLS.greenDuck);
    await productPage.addToCart(3);

    await cartPage.goto();
    const items = await cartPage.getCartItems();

    const item = items.find((i) => i.name.toLowerCase().includes('green'));
    expect(item).toBeDefined();
    expect(item!.quantity).toBe(3);
    expect(item!.price).toBe(PRODUCTS.greenDuck.price);
    expect(item!.total).toBe(PRODUCTS.greenDuck.price * 3);

    await cartPage.confirmOrder();
    expect(await cartPage.isOrderSuccess()).toBe(true);
  });
});
