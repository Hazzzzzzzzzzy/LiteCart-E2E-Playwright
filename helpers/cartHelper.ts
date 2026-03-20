import { Page, expect } from '@playwright/test';
import { URLS } from '../data/testData';
import { CART_SELECTORS } from './constants';

export async function acceptCookiesIfPresent(page: Page): Promise<void> {
  const okBtn = page.getByRole('button', { name: /^OK$/ }).first();
  if (await okBtn.isVisible().catch(() => false)) {
    await okBtn.click();
  }
}

export async function ensureEmptyCart(page: Page): Promise<void> {
  await page.goto(URLS.checkout);
  await acceptCookiesIfPresent(page);

  const removeButtons = page.locator(CART_SELECTORS.removeButton);
  while ((await removeButtons.count()) > 0) {
    const prevCount = await removeButtons.count();
    await removeButtons.first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator(CART_SELECTORS.removeButton)).toHaveCount(prevCount - 1, {
      timeout: 5000,
    });
  }
}
