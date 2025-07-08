import { expect, test } from '@playwright/test';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

test('has project details', async ({ page }) => {
  const project = await prisma.$transaction(async (trx) => {
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

    return newProject;
  });

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
    await prisma.project.delete({
      where: {
        id: project.id,
      },
    });
  }
});
