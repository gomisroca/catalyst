import { toggleProjectInteraction } from '@/actions/projects';
import ExtraInteractions from '@/app/_components/projects/extra-interactions';
import InteractionButton from '@/app/_components/projects/interaction-button';
import { auth } from '@/server/auth';
import { getProjectInteractions } from '@/server/queries/projects';

const typeMap = {
  likes: 'LIKE',
  shares: 'SHARE',
  bookmarks: 'BOOKMARK',
} as const;

export default async function ProjectInteractionsMenu({ projectId }: { projectId: string }) {
  const [session, data] = await Promise.all([auth(), getProjectInteractions(projectId)]);

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <InteractionButton
          key={key}
          type={typeMap[key]}
          data={data.interactions[key]}
          user={session?.user}
          entityId={projectId}
          entityKey="projectId"
          onInteract={() => toggleProjectInteraction(typeMap[key], projectId)}
        />
      ))}
      <ExtraInteractions
        user={session?.user}
        data={data.extraInteractions}
        entityId={projectId}
        entityKey="projectId"
        onInteract={(type) => toggleProjectInteraction(type, projectId)}
      />
    </div>
  );
}
