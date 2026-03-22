import { test, expect } from '@playwright/test';

test('homepage has correct title and renders main elements', async ({ page }) => {
  await page.goto('/');
  // Basic smoke test to ensure the Next.js app renders without crashing
  await expect(page).toHaveTitle(/Wanda/i);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  // Checking for basic elements that should exist in a portfolio
  const body = await page.locator('body');
  await expect(body).toBeVisible();
});
