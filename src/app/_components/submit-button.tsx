'use client';

import Button from '@/app/_components/ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ baseText, pendingText }: { baseText: string; pendingText: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingText : baseText}
    </Button>
  );
}
