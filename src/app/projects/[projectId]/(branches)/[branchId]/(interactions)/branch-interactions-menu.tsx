import { getBranchInteractions } from '@/server/queries/branches';
import BranchInteraction from './branch-interaction';
import BranchExtraInteractions from './branch-extra-interactions';
import { auth } from '@/server/auth';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function BranchInteractionsMenu({ branchId }: { branchId: string }) {
  const session = await auth();
  const data = await getBranchInteractions(branchId);
  const typeMap: Record<keyof typeof data.interactions, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <BranchInteraction key={key} type={typeMap[key]} data={data.interactions[key]} user={session?.user} />
      ))}
      <BranchExtraInteractions user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
