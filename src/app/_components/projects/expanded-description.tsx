'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function ExpandedDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div className="flex flex-row gap-2">
      <div
        ref={parent}
        className="flex-1 overflow-hidden px-2 transition-[max-height] duration-300"
        style={{ maxHeight: expanded ? '500px' : '45px' }}>
        <span className="block">{description}</span>
      </div>
      {description.length > 140 && (
        <Button
          name="Expand"
          onClick={() => setExpanded(!expanded)}
          className="my-auto flex h-[25px] w-[25px] items-center justify-center rounded-full">
          {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </Button>
      )}
    </div>
  );
}
