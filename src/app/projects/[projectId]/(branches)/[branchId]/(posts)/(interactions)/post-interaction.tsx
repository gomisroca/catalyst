'use client';

import { type User } from 'next-auth';
import { type InteractionWithUser } from 'types';

import { togglePostInteraction } from '@/actions/posts';
import ExtraInteractions from '@/app/_components/projects/extra-interactions';
import InteractionButton from '@/app/_components/projects/interaction-button';

const typeMap = {
  likes: 'LIKE',
  shares: 'SHARE',
  bookmarks: 'BOOKMARK',
} as const;

type Interactions = {
  likes: InteractionWithUser[];
  shares: InteractionWithUser[];
  bookmarks: InteractionWithUser[];
};
type ExtraInteractions = {
  reports: InteractionWithUser[];
  hides: InteractionWithUser[];
};

export default function PostInteractionsMenu({
  projectId,
  branchId,
  postId,
  interactions,
  extraInteractions,
  user,
}: {
  projectId: string;
  branchId: string;
  postId: string;
  interactions: Interactions;
  extraInteractions: ExtraInteractions;
  user?: User;
}) {
  return (
    <div className="flex flex-row gap-2">
      {(Object.keys(interactions) as Array<keyof typeof interactions>).map((key) => (
        <InteractionButton
          key={key}
          type={typeMap[key]}
          data={interactions[key]}
          user={user}
          entityId={postId}
          entityKey="postId"
          onInteract={() => togglePostInteraction(typeMap[key], projectId, branchId, postId)}
        />
      ))}
      <ExtraInteractions
        user={user}
        data={extraInteractions}
        entityId={postId}
        entityKey="postId"
        onInteract={(type) => togglePostInteraction(type, projectId, branchId, postId)}
      />
    </div>
  );
}
