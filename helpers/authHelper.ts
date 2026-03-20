import { Page, expect } from '@playwright/test';
import { ensureEmptyCart } from './cartHelper';
import { CREDENTIALS, TIMEOUTS } from '../data/testData';

interface LoginPageLike {
  goto(): Promise<void>;
  login(email: string, password: string): Promise<void>;
}

export async function loginAndClearCart(page: Page, loginPage: LoginPageLike): Promise<void> {
  await loginPage.goto();
  await loginPage.login(CREDENTIALS.email, CREDENTIALS.password);
  await expect(page).not.toHaveURL(/\/login/, { timeout: TIMEOUTS.login });
  await ensureEmptyCart(page);
}
