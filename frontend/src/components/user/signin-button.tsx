import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components//ui/tooltip';
import { UserRound } from 'lucide-react';

export default function SignInButton() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger className="w-full">
              <Button className="w-[40px] cursor-pointer" size="icon" variant={'outline'}>
                <span className="sr-only">Sign In</span>
                <UserRound className="w-[40px]" />
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
