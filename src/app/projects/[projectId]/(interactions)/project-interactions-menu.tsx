import ProjectExtraInteractions from '@/app/projects/[projectId]/(interactions)/project-extra-interactions';
import ProjectInteraction from '@/app/projects/[projectId]/(interactions)/project-interaction';
import { auth } from '@/server/auth';
import { getProjectInteractions } from '@/server/queries/projects';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function ProjectInteractionsMenu({ projectId }: { projectId: string }) {
  const session = await auth(); // Get the user's session server-side
  const data = await getProjectInteractions(projectId); // Get the project interactions

  // Map the interaction types to their corresponding InteractionType
  const typeMap: Record<keyof typeof data.interactions, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        // Public interactions (likes, shares, bookmarks)
        <ProjectInteraction key={key} type={typeMap[key]} data={data.interactions[key]} user={session?.user} />
      ))}
      {/* Private interactions (hides, reports) */}
      <ProjectExtraInteractions user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
