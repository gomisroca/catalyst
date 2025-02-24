import ExpandedDescription from '@/app/_components/projects/ExpandedDescription';
import { getProject } from '@/server/queries/projects';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const data = await getProject((await params).projectId);
  if (!data) return null;

  return (
    <div>
      {data.description && <ExpandedDescription description={data.description} />}
      Here will be the project description, maybe a header section with some details like date of creation, number of
      contributions, interactions, etc
    </div>
  );
}
