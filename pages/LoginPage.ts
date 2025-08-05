// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

const APPLICATION_URL = process.env.APP_URL;

export class LoginPage {
  readonly page: Page;
  readonly url: string = APPLICATION_URL!; // Base URL for the page

  // Locators for elements on the login page
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators using Playwright's page.locator() or getBy* methods
    // Use the robust selectors we identified earlier
    this.usernameInput = page.locator('input[type="text"][required]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    //this.loginButton = page.locator('button:has-text("Login")');
    this.errorMessage = page.locator('.mud-alert-message'); // Selector for the error message
  }

  // --- Page Actions ---

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    // Optional: Add a wait for a key element to ensure the page is loaded
    await this.page.waitForSelector('button:has-text("Login")');
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  // A composite action for logging in
  async login(username: string, password_val: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password_val);
    await this.clickLoginButton();
  }

  // --- Page Assertions/Verifications ---
  // These are methods that check the state of the page after an action

  async verifyErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
    await expect(this.errorMessage).toBeVisible(); // Ensure the message is visible
  }

  // Example: Verify successful login by checking URL or a post-login element
  async verifySuccessfulLogin(expectedUrlPart: string = '/home'): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`.*${expectedUrlPart}`));
    // You might also check for a specific element that appears only after login, e.g.:
    // await expect(this.page.locator('h1:has-text("Welcome to Dashboard")')).toBeVisible();
  }

  async verifyUnsuccessfulLogin(): Promise<void> {
    // For unsuccessful login, verify that the URL is still the login page or error is present
    await expect(this.page).toHaveURL(this.url);
    await expect(this.errorMessage).toBeVisible();
  }
}