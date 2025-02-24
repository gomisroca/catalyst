import { getBranchInteractions } from '@/server/queries/branches';
import BranchInteraction from './branch-interaction';
import BranchExtraInteractions from './branch-extra-interactions';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function BranchInteractionsMenu({ branchId }: { branchId: string }) {
  const data = await getBranchInteractions(branchId);
  const typeMap: Record<keyof typeof data, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data) as Array<keyof typeof data>).map((key) => (
        <BranchInteraction key={key} type={typeMap[key]} amount={data[key].length} />
      ))}
      <BranchExtraInteractions />
    </div>
  );
}
