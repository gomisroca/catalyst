'use client';

/**
 * Modal component that displays a dialog box with a backdrop. Uses react-dom's createPortal to render the modal in the background.
 *
 * @example
 * <Modal><h1>Hello, world!</h1></Modal>
 */

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { MdClear } from 'react-icons/md';
import Button from './button';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const [parent] = useAutoAnimate();

  // Add overflow hidden to body when modal is open
  useEffect(() => {
    const body = document.body;
    if (dialogRef.current?.open) {
      body.classList.add('overflow-hidden');
    }

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, []);

  // Show the modal when the component is mounted
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  // On dismiss, go back to the previous page, which will be the background page
  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div 
    className="absolute top-0 bottom-0 right-0 left-0 bg-black/70 flex justify-center items-center z-[1000]" 
    ref={parent}>
      <dialog ref={dialogRef} className="bg-zinc-100 dark:bg-zinc-900 relative w-[80%] max-w-[500px] m-auto max-height-[500px] rounded-lg p-4 flex justify-center items-center" onClose={onDismiss}>
        {children}
        <Button arialabel='Close' onClick={onDismiss} className="absolute top-[10px] right-[10px]"><MdClear size={10} /></Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
