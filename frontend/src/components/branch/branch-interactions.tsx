// Base Imports
import { create } from 'zustand';
// Hook Imports
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useAddBranchInteraction } from '@/hooks/interactions/useAddBranchInteraction';
import { useRemoveBranchInteraction } from '@/hooks/interactions/useRemoveBranchInteraction';
// UI Imports
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ban, BookmarkMinus, BookmarkPlus, EllipsisVertical, Eye, EyeOff, Forward, Star, StarOff } from 'lucide-react';

type INTERACTIONS = 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE';

// Zustand store for managing interactions
interface InteractionStoreState {
  interactions: Record<string, Interaction[]>;
  setInteractions: (branchId: string, interactions: Interaction[]) => void;
}
const useInteractionStore = create<InteractionStoreState>((set) => ({
  interactions: {},
  setInteractions: (branchId: string, interactions: Interaction[]) =>
    set((state) => ({
      interactions: { ...state.interactions, [branchId]: interactions },
    })),
}));

export default function BranchInteractions({ branch }: { branch: Branch }) {
  const { data: user } = useGetSelf();

  const { interactions, setInteractions } = useInteractionStore((state) => ({
    interactions: state.interactions[branch.id] || branch.interactions,
    setInteractions: state.setInteractions,
  }));

  const { mutate: addInteraction, isPending: addPending } = useAddBranchInteraction({
    onSuccess: (newInteraction) => {
      setInteractions(branch.id, [...interactions, newInteraction]);
    },
  });

  const { mutate: removeInteraction, isPending: removePending } = useRemoveBranchInteraction({
    onSuccess: (removedInteraction) => {
      setInteractions(
        branch.id,
        interactions.filter((int) => int.type !== removedInteraction.type || int.userId !== user?.id)
      );
    },
  });

  const isUserInteraction = (type: INTERACTIONS) =>
    interactions.some((int: Interaction) => int.type === type && int.userId === user?.id);
  const countInteraction = (type: INTERACTIONS) => interactions.filter((int: Interaction) => int.type === type).length;

  const handleAdd = (type: INTERACTIONS) => addInteraction({ branchId: branch.id, interaction: type });
  const handleRemove = (type: INTERACTIONS) => removeInteraction({ branchId: branch.id, interaction: type });

  const interactionButton = (type: INTERACTIONS, icons: [React.ElementType, React.ElementType]) => {
    const [ActiveIcon, InactiveIcon] = icons;
    const isActive = isUserInteraction(type);

    return (
      <Button
        onClick={() => (isActive ? handleRemove(type) : handleAdd(type))}
        variant="outline"
        className={isActive ? 'gap-1 bg-secondary' : 'gap-1'}
        disabled={addPending || removePending}
      >
        {isActive ? <ActiveIcon /> : <InactiveIcon />}
        {countInteraction(type)}
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {interactionButton('LIKE', [StarOff, Star])}
      {branch.permissions.allowShare &&
        branch.project.permissions.allowShare &&
        interactionButton('SHARE', [Forward, Forward])}
      {interactionButton('BOOKMARK', [BookmarkMinus, BookmarkPlus])}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <DropdownMenuItem
            onClick={() => (isUserInteraction('REPORT') ? null : handleAdd('REPORT'))}
            className={`cursor-pointer gap-1 ${isUserInteraction('REPORT') ? 'bg-secondary' : ''}`}
            disabled={isUserInteraction('REPORT')}
          >
            <Ban />
            Report
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => (isUserInteraction('HIDE') ? handleRemove('HIDE') : handleAdd('HIDE'))}
            className={`cursor-pointer gap-1 ${isUserInteraction('HIDE') ? 'bg-secondary' : ''}`}
          >
            {isUserInteraction('HIDE') ? <Eye /> : <EyeOff />}
            {isUserInteraction('HIDE') ? 'Show' : 'Hide'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
