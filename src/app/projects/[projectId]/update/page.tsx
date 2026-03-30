import NotAllowed from '@/app/_components/not-allowed';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';
import { getUserFollows } from '@/server/queries/users';

import UpdateProjectForm from './update-project-form';

export default async function ProjectUpdate({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const session = await auth();
  if (!session) return <NotAllowed />;

  const [project, follows] = await Promise.all([getProject(projectId), getUserFollows(session.user.id)]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Project</h1>
      <UpdateProjectForm project={project} follows={follows} />
    </div>
  );
}
