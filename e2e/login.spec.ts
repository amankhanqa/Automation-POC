import { test, expect } from '@playwright/test';


// Access credentials from environment variables
const APPLICATION_URL = process.env.APP_URL;
const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

// Use 'test.describe' to group related tests,
// especially useful for end-to-end flows.
test.describe('Login Functionality', () => {

  // Define a test case for successful login
  test('should allow a user to log in successfully', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto(APPLICATION_URL!);

    // 2. Locate elements and perform actions
    await page.fill('input[type="text"]', USERNAME!);
    await page.fill('input[type="password"]', PASSWORD!);

    // For the Login button:
    await page.locator('button:has-text("Login")').click();

    // 3. Assertions: Verify the outcome
    await expect(page).toHaveURL(/.*home/, { timeout: 30000 }); // successful login redirects to /dashboard
    //await expect(page.locator('.welcome-message')).toContainText('Welcome back!'); // welcome message assertion
  });

  // more tests here, e.g., for invalid login, forgotten password, etc.
  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto(APPLICATION_URL!);
    await page.fill('input[type="text"]', 'invalid_username');
    await page.fill('input[type="password"]', 'invalid_pswd');
    await page.locator('button:has-text("Login")').click();

    await expect(page.locator('div.mud-alert-message')).toHaveText('Invalid username or password.');
  });

});