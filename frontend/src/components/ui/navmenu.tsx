import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignInForm } from '../user/signin-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/contexts/user-provider';
import { UserSettingsForm } from '../user/user-settings-form';
import { FiFolderPlus } from 'react-icons/fi';
import { ProjectUploadForm } from '../project/project-upload-form';
import UserMenuButton from '../user/user-menu-button';
import SignInButton from '../user/signin-button';
import { Home } from 'lucide-react';
import { useState } from 'react';

export default function Navmenu() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      <header>
        <div className="m-auto flex w-fit gap-1 p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-[40px]" size="icon" variant={'outline'}>
                  <span className="sr-only">Home</span>
                  <Home className="w-[40px]" onClick={() => (window.location.href = '/')} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
          <Dialog>
            {user ? <UserMenuButton user={user} /> : <SignInButton />}
            <DialogContent className="w-5/6 rounded-md">{user ? <UserSettingsForm /> : <SignInForm />}</DialogContent>
          </Dialog>
          {user && (
            <Dialog open={open} onOpenChange={setOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button size="icon" variant={'outline'}>
                        <FiFolderPlus />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Create Project</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DialogContent className="w-5/6 rounded-md">
                <ProjectUploadForm onSubmitSuccess={handleSubmitSuccess} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </header>
    </>
  );
}
