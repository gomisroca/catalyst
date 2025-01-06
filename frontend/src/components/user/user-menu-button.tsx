// Hook Imports
import { useSignOut } from '@/hooks/auth/useSignOut';
// UI Imports
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export default function UserMenuButton({ user }: { user: BasicUser }) {
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    try {
      signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer" size="icon" asChild variant={'outline'}>
                  <Avatar className="rounded-md p-[0.2rem]">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + user.avatar}`} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>User Menu</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => (window.location.href = `/profile/${user.id}`)}>Profile</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => handleSignOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
