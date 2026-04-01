import { togglePostInteraction } from '@/actions/posts';
import ExtraInteractions from '@/app/_components/projects/extra-interactions';
import InteractionButton from '@/app/_components/projects/interaction-button';
import { auth } from '@/server/auth';
import { getPostInteractions } from '@/server/queries/posts';

const typeMap = {
  likes: 'LIKE',
  shares: 'SHARE',
  bookmarks: 'BOOKMARK',
} as const;

export default async function PostInteractionsMenu({
  projectId,
  branchId,
  postId,
}: {
  projectId: string;
  branchId: string;
  postId: string;
}) {
  const [session, data] = await Promise.all([auth(), getPostInteractions(postId)]);

  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(data.interactions) as Array<keyof typeof data.interactions>).map((key) => (
        <InteractionButton
          key={key}
          type={typeMap[key]}
          data={data.interactions[key]}
          user={session?.user}
          entityId={postId}
          entityKey="postId"
          onInteract={() => togglePostInteraction(typeMap[key], projectId, branchId, postId)}
        />
      ))}
      <ExtraInteractions
        user={session?.user}
        data={data.extraInteractions}
        entityId={postId}
        entityKey="postId"
        onInteract={(type) => togglePostInteraction(type, projectId, branchId, postId)}
      />
    </div>
  );
}
