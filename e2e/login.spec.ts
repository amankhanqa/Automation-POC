import 'dotenv/config'; // Make sure this is the VERY FIRST LINE

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';   // Import your new Page Object

// Access credentials from environment variables
const USERNAME = process.env.TRINITY_USERNAME;
const PASSWORD = process.env.TRINITY_PASSWORD;

// --- IMPORTANT VALIDATION ---
if (!USERNAME || !PASSWORD) {
  console.error('Environment variables TRINITY_USERNAME and TRINITY_PASSWORD must be set in your .env file or CI/CD secrets.');
  test.skip('Login tests skipped: Credentials not provided via environment variables', () => {});
}
// -----------------------------

test.describe('Trinity Minutecrew App Login', () => {
  let loginPage: LoginPage; // Declare a variable to hold the LoginPage object

  // This hook runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); // Initialize LoginPage with the current page fixture
    await loginPage.goto(); // Navigate to the login page using the POM method
  });

  test('should allow a user to log in successfully to Trinity Minutecrew', async () => {
    // Using the composite login method from the Page Object
    await loginPage.login(USERNAME!, PASSWORD!);

    // Assertions for successful login (replace with your actual post-login verification)
    await loginPage.verifySuccessfulLogin('/dashboard'); // Example: expects URL to change to /dashboard
  });

  test('should display an error for invalid login credentials', async () => {
    const INVALID_USERNAME = process.env.TRINITY_INVALID_USERNAME || 'invalid@example.com';
    const INVALID_PASSWORD = process.env.TRINITY_INVALID_PASSWORD || 'wrongpass';

    // Using the composite login method from the Page Object
    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);

    // Assertions for invalid login
    await loginPage.verifyErrorMessage('Invalid credentials'); // Example: verify error message text
    await loginPage.verifyUnsuccessfulLogin(); // Verify still on login page and error visible
  });

});