// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

const APPLICATION_URL = process.env.APP_URL;

export class OrdersPage {
  readonly page: Page;
  readonly url: string = APPLICATION_URL!; // Base URL for the page

  // Locators for elements on the login page
  readonly newOrderButton: Locator;
  readonly addJobOrderHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators using Playwright's page.locator() or getBy* methods
    this.newOrderButton = page.getByText('New Order');
    this.addJobOrderHeading = page.getByRole('heading', { name: 'Add Job Order' });
  }

  // --- Page Actions ---

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    // Optional: Add a wait for a key element to ensure the page is loaded
    await this.page.waitForSelector('button:has-text("Login")');
  }

  // --- New Validation Method ---
  async verifyAddJobOrderSectionIsVisible(): Promise<void> {
    await expect(this.addJobOrderHeading).toBeVisible();
    await expect(this.addJobOrderHeading).toContainText('Add Job Order');
  }

  async clickNewOrderButton(): Promise<void> {
    await this.newOrderButton.click();
  }
}