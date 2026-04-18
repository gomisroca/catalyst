'use client';

import { type User } from 'next-auth';
import { type InteractionWithUser } from 'types';

import { toggleProjectInteraction } from '@/actions/projects';
import ExtraInteractions from '@/app/_components/projects/extra-interactions';
import InteractionButton from '@/app/_components/projects/interaction-button';

const typeMap = { likes: 'LIKE', shares: 'SHARE', bookmarks: 'BOOKMARK' } as const;

type Interactions = {
  likes: InteractionWithUser[];
  shares: InteractionWithUser[];
  bookmarks: InteractionWithUser[];
};
type ExtraInteractions = {
  reports: InteractionWithUser[];
  hides: InteractionWithUser[];
};

export default function ProjectInteractionsMenu({
  projectId,
  interactions,
  extraInteractions,
  user,
}: {
  projectId: string;
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
          entityId={projectId}
          entityKey="projectId"
          onInteract={() => toggleProjectInteraction(typeMap[key], projectId)}
        />
      ))}
      <ExtraInteractions
        user={user}
        data={extraInteractions}
        entityId={projectId}
        entityKey="projectId"
        onInteract={(type) => toggleProjectInteraction(type, projectId)}
      />
    </div>
  );
}
