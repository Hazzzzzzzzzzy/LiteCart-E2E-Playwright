import { test, expect } from '../fixtures/testFixtures';
import { CREDENTIALS } from '../data/testData';

test.describe('TC-04: Невалидный логин', () => {
  test('неверный пароль, остаёмся на /login', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.email, CREDENTIALS.invalidPassword);

    await expect(page).toHaveURL(/\/login/);
    expect(await loginPage.isErrorDisplayed()).toBe(true);
  });
});
