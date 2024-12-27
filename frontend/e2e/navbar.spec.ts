import { test, expect } from '@playwright/test';

test('renders the correct buttons', async ({ page }) => {
  await page.goto('/');
  const navbar = page.getByRole('banner').locator('div');

  await expect(navbar.getByRole('button', { name: 'Home' })).toBeVisible();
  await expect(navbar.getByRole('button', { name: 'Theme Toggle' })).toBeVisible();
});

test('renders the content tabs', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('tab', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'For You' })).toBeVisible();
});
