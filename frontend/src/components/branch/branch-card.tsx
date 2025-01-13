// Hook Imports
import { useMemo, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { BsQuestion } from 'react-icons/bs';
import { Eye } from 'lucide-react';
// Component Imports
import BranchInteractions from '@/components/branch/branch-interactions';
import { twMerge } from 'tailwind-merge';
import BranchDetails from './branch-details';

export default function BranchCard({ branch }: { branch: Branch }) {
  const { data: user } = useGetSelf();

  const isBranchHidden = useMemo(
    () =>
      branch.interactions.some(
        (interaction) => ['REPORT', 'HIDE'].includes(interaction.type) && interaction.user.id === user?.id
      ),
    [branch.interactions, user?.id]
  );
  const [hideBranch, setHideBranch] = useState(isBranchHidden);

  return (
    <Card className="relative p-4">
      {hideBranch && (
        <div className="absolute z-10 flex h-5/6 w-11/12 items-center justify-center gap-1 rounded-md">
          <Button size={'lg'} onClick={() => setHideBranch(false)}>
            <Eye aria-label="Show hidden branch" />
            Show Branch
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BsQuestion aria-label="Why is this branch hidden?" className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>
                {branch.interactions.some((i) => i.type === 'REPORT')
                  ? 'You reported this branch.'
                  : 'You hid this branch.'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div className={twMerge('flex items-center gap-2', hideBranch && 'blur-md')}>
        <BranchDetails branch={branch} user={user} />
        <CardContent className={twMerge('flex flex-col gap-1', hideBranch && 'blur-md')}></CardContent>
        <BranchInteractions branch={branch} />
      </div>
    </Card>
  );
}
