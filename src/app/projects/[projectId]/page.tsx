import ExpandedDescription from '@/app/_components/projects/expanded-description';
import { getProject } from '@/server/queries/projects';

import ProjectInteractionsMenu from './(interactions)/project-interaction';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const data = await getProject((await params).projectId);

  return (
    <>
      <ExpandedDescription description={data.description} />
      <ProjectInteractionsMenu projectId={data.id} />
    </>
  );
}
