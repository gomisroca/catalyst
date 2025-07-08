import { expect, test } from '@playwright/test';

import { db } from '@/server/db';

test('has branch details', async ({ page }) => {
  const [project, branch] = await db.$transaction(async (trx) => {
    const newProject = await trx.project.create({
      data: {
        name: 'Temp Project',
        description: 'This is a temporary project',
        authorId: 'c3895654-8595-46cf-9190-a89ff1ce8750',
      },
      include: {
        author: true,
      },
    });
    await trx.projectPermissions.create({
      data: {
        projectId: newProject.id,
        private: false,
        allowCollaborate: false,
        allowShare: false,
      },
    });

    const mainBranch = await trx.branch.create({
      data: {
        name: 'main',
        description: 'This is a temporary branch',
        default: true,
        projectId: newProject.id,
        authorId: 'c3895654-8595-46cf-9190-a89ff1ce8750',
      },
      include: {
        author: true,
      },
    });

    await trx.branchPermissions.create({
      data: {
        branchId: mainBranch.id,
        private: false,
        allowCollaborate: false,
        allowShare: false,
        allowBranch: false,
      },
    });

    return [newProject, mainBranch];
  });

  try {
    await page.goto(`/projects/${project.id}/${branch.id}`);

    await expect(page).toHaveURL(`/projects/${project.id}/${branch.id}`);
    await expect(page.getByRole('heading', { name: branch.name })).toBeVisible();
    await expect(
      page.getByRole('link', { name: branch.author.name ?? project.author.email.split('@')[0] })
    ).toBeVisible();
    await expect(page.getByText('This is a temporary branch')).toBeVisible();
  } finally {
    await db.project.delete({
      where: {
        id: project.id,
      },
    });
  }
});
