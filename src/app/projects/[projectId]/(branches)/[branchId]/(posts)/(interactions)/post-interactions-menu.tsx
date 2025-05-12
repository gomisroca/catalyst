// Libraries
import { auth } from '@/server/auth';
// Queries
import { getPostInteractions } from '@/server/queries/posts';
// Components
import PostExtraInteractions from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/(interactions)/post-extra-interactions';
import PostInteraction from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/(interactions)/post-interaction';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function PostInteractionsMenu({ postId }: { postId: string }) {
  const session = await auth(); // Get the user's session server-side
  const data = await getPostInteractions(postId); // Get the post interactions

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
        <PostInteraction
          key={key}
          postId={postId}
          type={typeMap[key]}
          data={data.interactions[key]}
          user={session?.user}
        />
      ))}
      {/* Private interactions (hides, reports) */}
      <PostExtraInteractions postId={postId} user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
