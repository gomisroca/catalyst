import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { UserRound } from 'lucide-react';

export default function SignInButton() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger className="w-full">
              <Button className="cursor-pointer" size="icon" asChild variant={'outline'}>
                <UserRound />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign In</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
