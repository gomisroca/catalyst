import { toggleBranchInteraction } from '@/actions/branches';
import ExtraInteractions from '@/app/_components/projects/extra-interactions';
import InteractionButton from '@/app/_components/projects/interaction-button';
import { auth } from '@/server/auth';
import { getBranchInteractions } from '@/server/queries/branches';

const typeMap = {
  likes: 'LIKE',
  shares: 'SHARE',
  bookmarks: 'BOOKMARK',
} as const;

export default async function BranchInteractionsMenu({ projectId, branchId }: { projectId: string; branchId: string }) {
  const [session, data] = await Promise.all([auth(), getBranchInteractions(branchId)]);

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <InteractionButton
          key={key}
          type={typeMap[key]}
          data={data.interactions[key]}
          user={session?.user}
          entityId={branchId}
          entityKey="branchId"
          onInteract={() => toggleBranchInteraction(typeMap[key], projectId, branchId)}
        />
      ))}
      <ExtraInteractions
        user={session?.user}
        data={data.extraInteractions}
        entityId={branchId}
        entityKey="branchId"
        onInteract={(type) => toggleBranchInteraction(type, projectId, branchId)}
      />
    </div>
  );
}
