import { Locator, Page } from '@playwright/test';
import { acceptCookiesIfPresent } from '../helpers';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly errorNotice: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.locator('input[name="email"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: /login/i });
    this.errorMessage = this.page.getByText(
      /wrong|incorrect|invalid|incorrect email|password or the account/i
    );
    this.errorNotice = this.page.locator(
      '.notice.errors, .alert-danger, [class*="error"]'
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/login');
    await acceptCookiesIfPresent(this.page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isErrorDisplayed(): Promise<boolean> {
    return (
      (await this.errorMessage.isVisible()) || (await this.errorNotice.isVisible())
    );
  }
}
