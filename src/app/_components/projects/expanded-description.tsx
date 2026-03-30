'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import Button from '@/app/_components/ui/button';

export default function ExpandedDescription({ description }: { description: string | null }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="flex flex-row gap-2">
      <div
        className="flex-1 overflow-hidden px-2 transition-[max-height] duration-300"
        style={{ maxHeight: expanded ? '500px' : '45px' }}>
        <span className="block">{description}</span>
      </div>
      {description.length > 140 && (
        <Button
          arialabel="Expand"
          onClick={() => setExpanded(!expanded)}
          className="my-auto size-6 items-center justify-center px-0 py-0">
          {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </Button>
      )}
    </div>
  );
}
