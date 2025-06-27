import ExpandedDescription from '@/app/_components/projects/expanded-description';
import ProjectInteractionsMenu from '@/app/projects/[projectId]/(interactions)/project-interactions-menu';
import { getProject } from '@/server/queries/projects';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const data = await getProject((await params).projectId); // Get the project data
  if (!data) return null;

  return (
    <>
      <ExpandedDescription description={data.description} />
      <ProjectInteractionsMenu projectId={data.id} />
    </>
  );
}
