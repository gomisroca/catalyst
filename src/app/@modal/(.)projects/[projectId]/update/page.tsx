import Modal from '@/app/_components/ui/modal';
import UpdateProjectForm from '@/app/projects/[projectId]/update/update-project-form';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';
import Link from 'next/link';

export default async function UpdateProjectModal({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  const session = await auth();
  const project = await getProject((await searchParams).projectId);
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to update your project.</p>
        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <Modal>
      <UpdateProjectForm project={project} />
    </Modal>
  );
}
