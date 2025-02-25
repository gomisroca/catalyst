'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { projectsInteractions } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addInteractionAction(type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE', projectId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to add an interaction');

    const existingInteraction = await db
      .select()
      .from(projectsInteractions)
      .where(
        and(
          eq(projectsInteractions.projectId, projectId),
          eq(projectsInteractions.userId, session.user.id),
          eq(projectsInteractions.type, type)
        )
      )
      .limit(1);
    if (existingInteraction.length > 0) return { msg: 'Interaction already exists' };

    await db.insert(projectsInteractions).values({
      type,
      projectId,
      userId: session.user.id,
    });
    revalidatePath(`/projects/${projectId}`);
    return { msg: 'Interaction created successfully' };
  } catch (error) {
    console.error('Failed to create interaction:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
export async function removeInteractionAction(
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE',
  projectId: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to remove an interaction');

    const deletedRows = await db
      .delete(projectsInteractions)
      .where(
        and(
          eq(projectsInteractions.projectId, projectId),
          eq(projectsInteractions.userId, session.user.id),
          eq(projectsInteractions.type, type)
        )
      )
      .returning({ id: projectsInteractions.id });
    if (deletedRows.length === 0) {
      return { msg: 'No interaction found to remove' };
    }

    revalidatePath(`/projects/${projectId}`);
    return { msg: 'Interaction removed successfully' };
  } catch (error) {
    console.error('Failed to remove interaction:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
