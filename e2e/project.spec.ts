import { expect, test } from '@playwright/test';
import { PrismaClient } from 'generated/prisma';

import { createTestProject } from './testUtils';

test('has project details', async ({ page }) => {
  const db = new PrismaClient();

  const project = await createTestProject(db);
  if (!project) throw new Error('Failed to create project');

  try {
    await page.goto('/projects/' + project.id);

    await expect(page).toHaveURL('/projects/' + project.id);
    await expect(page.getByRole('heading', { name: project.name })).toBeVisible();
    await expect(
      page.getByRole('link', {
        name: project.author.name ?? project.author.email.split('@')[0],
      })
    ).toBeVisible();
    await expect(page.getByText('This is a temporary project')).toBeVisible();
  } finally {
    await db.project.delete({
      where: {
        id: project.id,
      },
    });
  }
});
