import { getProject } from '@/server/queries/projects';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const data = await getProject((await params).projectId);
  if (!data) return null;

  return (
    <div>
      Here will be the project description, maybe a header section with some details like date of creation, number of
      contributions, interactions, etc
    </div>
  );
}
