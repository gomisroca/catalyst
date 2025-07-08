import { expect, test } from '@playwright/test';
import { PrismaClient } from 'generated/prisma';

import { createTestBranch } from './testUtils';

test('has branch details', async ({ page }) => {
  const db = new PrismaClient();

  const data = await createTestBranch(db);

  if (!data) throw new Error('Failed to create project');
  try {
    await page.goto(`/projects/${data.project.id}/${data.branch.id}`);

    await expect(page).toHaveURL(`/projects/${data.project.id}/${data.branch.id}`);
    await expect(page.getByRole('heading', { name: data.branch.name })).toBeVisible();
    await expect(page.getByRole('link', { name: data.branch.authorName })).toBeVisible();
    await expect(page.getByText('This is a temporary branch')).toBeVisible();
  } finally {
    await db.project.delete({
      where: {
        id: data.project.id,
      },
    });
  }
});
