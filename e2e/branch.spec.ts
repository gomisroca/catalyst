import { expect, test } from '@playwright/test';

test('has branch name', async ({ page }) => {
  await page.goto('/');

  const branchLink = page.getByRole('listitem').first();
  await expect(branchLink).toBeInViewport();

  const branchName = branchLink.getByRole('link').last();
  const href = await branchName.getAttribute('href');
  const name = await branchName.innerText();

  await branchName.click();

  await expect(page).toHaveURL(href!);

  await expect(page.getByRole('heading', { name })).not.toBeEmpty();
});
