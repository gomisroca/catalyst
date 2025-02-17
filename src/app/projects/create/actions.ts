'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { projects, projectsPermissions } from '@/server/db/schema';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long'),
  picture: z.string().optional(),
  private: z.boolean().optional(),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  // Extract and validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name'),
    picture: formData.get('picture'),
    private: formData.get('private') === 'on',
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.toString(),
    };
  }

  let projectId: string | undefined;

  try {
    const result = await db
      .insert(projects)
      .values({
        name: validatedFields.data.name,
        picture: validatedFields.data.picture,
        authorId: session.user.id,
      })
      .returning({ id: projects.id });
    if (result.length === 0 || !result[0]) return { error: 'Failed to create project' };
    projectId = result[0].id;

    // Create project permissions
    await db.insert(projectsPermissions).values({
      projectId: projectId,
      allowedUsers: [session.user.id],
      private: validatedFields.data.private,
    });
  } catch (error) {
    console.error('Failed to create project:', error);
    return { error: 'An unexpected error occurred' };
  }

  if (projectId) {
    redirect(`/projects/${projectId}`);
  }

  return { error: 'Failed to create project' };
}
