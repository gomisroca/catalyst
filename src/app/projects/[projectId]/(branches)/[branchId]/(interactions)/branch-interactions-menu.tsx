// Libraries
import { auth } from '@/server/auth';
// Queries
import { getBranchInteractions } from '@/server/queries/branches';
// Components
import BranchInteraction from '@/app/projects/[projectId]/(branches)/[branchId]/(interactions)/branch-interaction';
import BranchExtraInteractions from '@/app/projects/[projectId]/(branches)/[branchId]/(interactions)/branch-extra-interactions';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function BranchInteractionsMenu({ branchId }: { branchId: string }) {
  const session = await auth(); // Get the session
  const data = await getBranchInteractions(branchId); // Get the branch interactions

  // Map the interaction type to the corresponding icon
  const typeMap: Record<keyof typeof data.interactions, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        // Public interactions
        <BranchInteraction key={key} type={typeMap[key]} data={data.interactions[key]} user={session?.user} />
      ))}
      {/* Private interactions */}
      <BranchExtraInteractions user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
