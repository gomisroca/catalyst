import NotAllowed from '@/app/_components/not-allowed';
import Modal from '@/app/_components/ui/modal';
import UpdateProjectForm from '@/app/projects/[projectId]/update/update-project-form';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';
import { getUserFollows } from '@/server/queries/users';

export default async function UpdateProjectModal({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const follows = await getUserFollows(session.user.id);
  const project = await getProject((await searchParams).projectId);

  return (
    <Modal>
      <UpdateProjectForm project={project} follows={follows} />
    </Modal>
  );
}
