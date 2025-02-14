'use client';

import Button from '@/app/_components/ui/button';
import Modal from '@/app/_components/ui/modal';

export default function SignInModal() {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">Sign in to continue</p>
        <Button className="w-full" onClick={() => alert('Sign in')}>
          Sign in
        </Button>
      </div>
    </Modal>
  );
}
