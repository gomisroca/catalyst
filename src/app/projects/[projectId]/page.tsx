import ExpandedDescription from '@/app/_components/projects/expanded-description';
import { auth } from '@/server/auth';
import { getProject, getProjectInteractions } from '@/server/queries/projects';

import ProjectInteractionsMenu from './(interactions)/project-interaction';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  const [session, interactionsData] = await Promise.all([auth(), getProjectInteractions(projectId)]);

  return (
    <>
      <ExpandedDescription description={project.description} />
      <ProjectInteractionsMenu
        projectId={projectId}
        interactions={interactionsData.interactions}
        extraInteractions={interactionsData.extraInteractions}
        user={session?.user}
      />
    </>
  );
}
