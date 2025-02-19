'use client';

import Button from '@/app/_components/ui/button';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export default function SubmitButton({
  baseText,
  pendingText,
  className,
}: {
  baseText: string;
  pendingText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={twMerge('w-fit font-semibold whitespace-nowrap', className)} disabled={pending}>
      {pending ? pendingText : baseText}
    </Button>
  );
}
