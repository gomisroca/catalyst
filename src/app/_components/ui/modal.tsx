'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { MdClear } from 'react-icons/md';

import Button from './button';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, []);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70">
      <dialog
        ref={dialogRef}
        className="relative m-auto flex max-h-125 w-[80%] max-w-125 items-center justify-center rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900"
        onClose={onDismiss}>
        {children}
        <Button arialabel="Close" onClick={onDismiss} className="absolute top-2 right-2 p-1">
          <MdClear size={14} />
        </Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}