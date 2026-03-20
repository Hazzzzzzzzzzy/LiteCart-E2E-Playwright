import { Locator, Page } from '@playwright/test';

const SLUG_TO_NAME_REGEX = /([a-z]+-duck)(?=-p-|\/|$)/i;

export class HomePage {
  private readonly recentlyViewedSection: Locator;
  private readonly recentlyViewedLinks: Locator;

  constructor(private readonly page: Page) {
    this.recentlyViewedSection = this.page.locator(
      'h3:has-text("Recently Viewed")'
    );
    this.recentlyViewedLinks = this.page.locator(
      '//h3[contains(.,"Recently Viewed")]/..//a[contains(@href,"duck")]'
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/');
  }

  async getRecentlyViewedProductNames(): Promise<string[]> {
    const count = await this.recentlyViewedLinks.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      const link = this.recentlyViewedLinks.nth(i);
      const title = await link.getAttribute('title');
      const href = await link.getAttribute('href') || '';

      if (title) {
        names.push(title);
      } else {
        const match = href.match(SLUG_TO_NAME_REGEX);
        if (match) {
          names.push(this.slugToTitle(match[1]));
        }
      }
    }

    return names;
  }

  async hasProductInRecentlyViewed(productName: string): Promise<boolean> {
    const names = await this.getRecentlyViewedProductNames();
    const search = productName.toLowerCase();
    return names.some((n) => n.toLowerCase().includes(search));
  }

  getRecentlyViewedLocator() {
    return this.recentlyViewedSection;
  }

  private slugToTitle(slug: string): string {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
