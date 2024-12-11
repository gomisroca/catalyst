import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/user-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export default function UserMenuButton({ user }: { user: User }) {
  const { signOut } = useUser();
  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer" size="icon" asChild variant={'outline'}>
                  <Avatar className="rounded-md p-[0.2rem]">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${user.avatar}`} />
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
          <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
