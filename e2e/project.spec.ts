import { expect, test } from '@playwright/test';

test('has project name', async ({ page }) => {
  await page.goto('/');

  const projectLink = page.getByRole('listitem').first();
  await expect(projectLink).toBeInViewport();

  const projectName = projectLink.getByRole('link').first();
  const href = await projectName.getAttribute('href');
  const name = await projectName.innerText();

  await projectName.click();

  await expect(page).toHaveURL(href!);

  await expect(page.getByRole('heading', { name })).not.toBeEmpty();
});
