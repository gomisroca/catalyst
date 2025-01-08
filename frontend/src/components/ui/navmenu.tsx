// Hook Imports
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FiFolderPlus } from 'react-icons/fi';
import { Home } from 'lucide-react';
// Component Imports
import { ModeToggle } from '@/components/mode-toggle';
import { SignInForm } from '@/components/user/signin-form';
import { UserSettingsForm } from '@/components/user/user-settings-form';
import UserMenuButton from '@/components/user/user-menu-button';
import SignInButton from '@/components/user/signin-button';
import { useNavigate } from 'react-router-dom';

export default function Navmenu() {
  const navigate = useNavigate();
  const { data: user } = useGetSelf();

  const handleClick = (href: string) => {
    navigate(href);
  };

  return (
    <>
      <header>
        <div className="m-auto flex w-fit gap-1 p-4">
          <Button className="w-[40px]" size="icon" variant={'outline'}>
            <span className="sr-only">Home</span>
            <Home className="w-[40px]" onClick={() => handleClick('/')} />
          </Button>
          <ModeToggle />
          <Dialog>
            {user ? <UserMenuButton user={user} /> : <SignInButton />}
            <DialogContent className="w-5/6 rounded-md">{user ? <UserSettingsForm /> : <SignInForm />}</DialogContent>
          </Dialog>
          {user && (
            <Button size="icon" variant={'outline'} onClick={() => navigate('/projects/new')}>
              <FiFolderPlus />
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
