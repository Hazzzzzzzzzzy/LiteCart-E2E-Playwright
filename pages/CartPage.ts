import { Locator, Page } from '@playwright/test';
import { CART_SELECTORS, PRICE_REGEX } from '../helpers';
import { TIMEOUTS } from '../data/testData';

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export class CartPage {
  private readonly confirmButton: Locator;
  private readonly stepButtons: Locator;

  constructor(private readonly page: Page) {
    this.confirmButton = this.page.getByRole('button', {
      name: /confirm\s*order|place\s*order/i,
    });
    this.stepButtons = this.page.locator(
      'button:has-text("Confirm"), button:has-text("Place Order"), button:has-text("Continue"), button:has-text("Save")'
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/checkout');
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItems(): Promise<CartItem[]> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(CART_SELECTORS.cartReady, {
      timeout: TIMEOUTS.cartReady,
    });

    const rows = this.page.locator(CART_SELECTORS.itemRow);
    const count = await rows.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const nameEl = row.locator('a[href*="duck"], strong').first();
      const qtyEl = row.locator('[role="spinbutton"], input[type="number"]').first();
      const rowText = (await row.textContent()) || '';

      const name =
        (await nameEl.textContent())?.trim() || rowText.split('[')[0].trim();
      const qty = parseInt((await qtyEl.inputValue()) || '1', 10) || 1;
      const priceMatch = rowText.match(PRICE_REGEX);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

      items.push({ name, quantity: qty, price, total: price * qty });
    }

    return items;
  }

  async confirmOrder(): Promise<void> {
    await this.page.waitForLoadState('networkidle');

    for (let i = 0; i < 5; i++) {
      if (await this.confirmButton.first().isVisible()) {
        await this.confirmButton.first().click();
        return;
      }
      const nextBtn = this.stepButtons.nth(i);
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
      } else {
        break;
      }
    }
  }

  async isOrderSuccess(): Promise<boolean> {
    await this.page
      .waitForURL(/order_success|success|thank/i, { timeout: TIMEOUTS.orderSuccess })
      .catch(() => {});

    const content = (await this.page.content()).toLowerCase();
    return (
      content.includes('success') ||
      content.includes('completed') ||
      content.includes('thank')
    );
  }
}
