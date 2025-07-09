import { expect, test } from '@playwright/test';

test('has branch name', async ({ page }) => {
  await page.goto('/');

  const listItems = page.getByRole('listitem');
  const itemCount = await listItems.count();

  let branchLink;
  let branchName;
  let href;
  let name;

  for (let i = 0; i < itemCount; i++) {
    const item = listItems.nth(i);
    const links = item.getByRole('link');
    const linkCount = await links.count();

    if (linkCount > 0) {
      const lastLink = links.last();
      const currentHref = await lastLink.getAttribute('href');

      if (currentHref && /^\/projects\/[^\/]+\/[^\/]+$/.exec(currentHref)) {
        branchLink = item;
        branchName = lastLink;
        href = currentHref;
        name = await lastLink.innerText();
        break;
      }
    }
  }

  // Skip test if no branch found
  test.skip(!branchLink, 'No branch items found on homepage');

  if (!branchLink || !branchName || !href || !name) {
    throw new Error('Branch data not found');
  }

  // Continue with test
  await expect(branchLink).toBeInViewport();
  await branchName.click();
  await expect(page).toHaveURL(href);
  await expect(page.getByRole('heading', { name })).not.toBeEmpty();
});
