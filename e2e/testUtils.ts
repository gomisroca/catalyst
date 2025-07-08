import { PrismaClient } from 'generated/prisma';

export function createTestDb() {
  return new PrismaClient();
}

export async function createTestProject(db: PrismaClient) {
  try {
    const project = await db.$transaction(async (trx) => {
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

    return project;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ Failed to create project`, err);
  }
}

export async function createTestBranch(db: PrismaClient) {
  try {
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

    return {
      project: { id: project.id },
      branch: {
        id: branch.id,
        name: branch.name,
        description: branch.description,
        authorName: branch.author.name ?? branch.author.email.split('@')[0],
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ Failed to create branch`, err);
  }
}

export async function cleanup(db: PrismaClient, projectId: string) {
  try {
    await db.project.delete({
      where: { id: projectId },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ Failed to delete project ${projectId}`, err);
  }
}
