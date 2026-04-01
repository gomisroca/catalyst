import { notFound } from 'next/navigation';

import NotAllowed from '@/app/_components/not-allowed';
import CreateBranchForm from '@/app/projects/[projectId]/(branches)/create/create-branch-form';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';

export default async function CreateBranch({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  const [project, session] = await Promise.all([getProject(projectId).catch(() => null), auth()]);

  if (!project) notFound();

  const allowCollaborate = session?.user?.id === project.author.id || project.permissions?.allowCollaborate;
  if (!session || !allowCollaborate) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Branch</h1>
      <CreateBranchForm />
    </div>
  );
}
