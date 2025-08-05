// e2e/jobOrder.spec.ts

import 'dotenv/config'; // Make sure this is the VERY FIRST LINE

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OrdersPage } from '../pages/OrdersPage'; // Correct import name

// Access credentials from environment variables
const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

// --- IMPORTANT VALIDATION ---
if (!USERNAME || !PASSWORD) {
  console.error('Environment variables TRINITY_USERNAME and TRINITY_PASSWORD must be set in your .env file or CI/CD secrets.');
  test.skip('Login tests skipped: Credentials not provided via environment variables', () => {});
}
// -----------------------------

test.describe('Trinity Minutecrew App Job Order', () => {
  let loginPage: LoginPage;
  let ordersPage: OrdersPage; // Correct variable type

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    ordersPage = new OrdersPage(page); // Correct class name here
    await loginPage.goto();
    await loginPage.login(USERNAME!, PASSWORD!);
    await loginPage.verifySuccessfulLogin('/home');
    await page.goto('/workspace/orders'); // Navigate to the Orders page
    await expect(page).toHaveURL(/.*\/workspace\/orders/); // Verify navigation
  });

  test('should be able to create new job order', async () => {
    await ordersPage.clickNewOrderButton();
    await ordersPage.verifyAddJobOrderSectionIsVisible();
  });
});
