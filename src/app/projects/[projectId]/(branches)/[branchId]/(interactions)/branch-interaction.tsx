'use client';

import { type User } from 'next-auth';
import { type InteractionWithUser } from 'types';

import { toggleBranchInteraction } from '@/actions/branches';
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

export default function BranchInteractionsMenu({
  projectId,
  branchId,
  interactions,
  extraInteractions,
  user,
}: {
  projectId: string;
  branchId: string;
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
          entityId={branchId}
          entityKey="branchId"
          onInteract={() => toggleBranchInteraction(typeMap[key], projectId, branchId)}
        />
      ))}
      <ExtraInteractions
        user={user}
        data={extraInteractions}
        entityId={branchId}
        entityKey="branchId"
        onInteract={(type) => toggleBranchInteraction(type, projectId, branchId)}
      />
    </div>
  );
}
