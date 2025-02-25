import { auth } from '@/server/auth';
import PostExtraInteractions from './post-extra-interactions';
import PostInteraction from './post-interaction';
import { getPostInteractions } from '@/server/queries/posts';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

export default async function PostInteractionsMenu({ postId }: { postId: string }) {
  const session = await auth();
  const data = await getPostInteractions(postId);
  const typeMap: Record<keyof typeof data.interactions, InteractionType> = {
    likes: 'LIKE',
    shares: 'SHARE',
    bookmarks: 'BOOKMARK',
  };
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <PostInteraction
          key={key}
          postId={postId}
          type={typeMap[key]}
          data={data.interactions[key]}
          user={session?.user}
        />
      ))}
      <PostExtraInteractions postId={postId} user={session?.user} data={data.extraInteractions} />
    </div>
  );
}
