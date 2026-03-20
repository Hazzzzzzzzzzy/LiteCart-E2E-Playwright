import { Locator, Page } from '@playwright/test';
import { acceptCookiesIfPresent } from '../helpers';
import { TIMEOUTS } from '../data/testData';

export class ProductPage {
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly sizeSelect: Locator;

  constructor(private readonly page: Page) {
    this.quantityInput = this.page.locator('input[name="quantity"]').first();
    this.addToCartButton = this.page
      .getByRole('button', { name: /add\s*to\s*cart/i })
      .first();
    this.sizeSelect = this.page.locator('select[name="options[Size]"]');
  }

  async goto(productPath: string): Promise<void> {
    await this.page.goto(productPath);
    await acceptCookiesIfPresent(this.page);
  }

  async addToCart(quantity = 1): Promise<void> {
    if (await this.sizeSelect.isVisible().catch(() => false)) {
      await this.sizeSelect.selectOption({ index: 1 });
    }

    await this.quantityInput.clear();
    await this.quantityInput.fill(String(quantity));

    await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes('/ajax/cart.json'),
        { timeout: TIMEOUTS.networkIdle }
      ),
      this.addToCartButton.click(),
    ]).catch(() => this.page.waitForLoadState('networkidle'));
  }
}
