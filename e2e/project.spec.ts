import { expect, test } from '@playwright/test';

test('has project name', async ({ page }) => {
  await page.goto('/');

  const listItems = page.getByRole('listitem');
  const itemCount = await listItems.count();

  let projectLink;
  let projectName;
  let href;
  let name;

  for (let i = 0; i < itemCount; i++) {
    const item = listItems.nth(i);
    const links = item.getByRole('link');
    const linkCount = await links.count();

    if (linkCount > 0) {
      const firstLink = links.first();
      const currentHref = await firstLink.getAttribute('href');

      if (currentHref && /^\/projects\/[^\/]+$/.exec(currentHref)) {
        projectLink = item;
        projectName = firstLink;
        href = currentHref;
        name = await firstLink.innerText();
        break;
      }
    }
  }

  // Skip test if no project found
  test.skip(!projectLink, 'No project items found on homepage');

  if (!projectLink || !projectName || !href || !name) {
    throw new Error('Project data not found');
  }

  // Continue with test
  await expect(projectLink).toBeInViewport();
  await projectName.click();
  await expect(page).toHaveURL(href);
  await expect(page.getByRole('heading', { name })).not.toBeEmpty();
});
