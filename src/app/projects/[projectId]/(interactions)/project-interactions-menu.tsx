import { getProjectInteractions } from '@/server/queries/projects';
import ProjectInteraction from './project-interaction';
import ProjectExtraInteractions from './project-extra-interactions';
import { auth } from '@/server/auth';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function ProjectInteractionsMenu({ projectId }: { projectId: string }) {
  const session = await auth();
  const data = await getProjectInteractions(projectId);
  const typeMap: Record<keyof typeof data.interactions, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <ProjectInteraction key={key} type={typeMap[key]} data={data.interactions[key]} user={session?.user} />
      ))}
      <ProjectExtraInteractions user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
