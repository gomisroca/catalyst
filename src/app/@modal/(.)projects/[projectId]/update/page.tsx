import NotAllowed from '@/app/_components/not-allowed';
import Modal from '@/app/_components/ui/modal';
import UpdateProjectForm from '@/app/projects/[projectId]/update/update-project-form';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';

export default async function UpdateProjectModal({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  const session = await auth();
  const project = await getProject((await searchParams).projectId);
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <Modal>
      <UpdateProjectForm project={project} />
    </Modal>
  );
}
