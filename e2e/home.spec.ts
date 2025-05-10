import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Catalyst/);
});

test('has a home link', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Catalyst' })).toHaveAttribute('href', '/');
});

test('has a user menu', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'User Menu' })).toBeVisible();

  await page.getByRole('button', { name: 'User Menu' }).click();

  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
});

test('has a search function', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to Search' })).toBeVisible();
});
