'use client';

/**
 * Expandable description component for projects.
 */

// Libraries
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// Components
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';

export default function ExpandedDescription({ description }: { description: string | null }) {
  const [expanded, setExpanded] = useState(false); // State to track if the description is expanded
  const [parent] = useAutoAnimate();

  if (!description) return null;
  return (
    <div className="flex flex-row gap-2">
      <div
        ref={parent}
        className="flex-1 overflow-hidden px-2 transition-[max-height] duration-300"
        style={{ maxHeight: expanded ? '500px' : '45px' }}>
        <span className="block">{description}</span>
      </div>
      {/* If the description is longer than 140 characters, render the expand button */}
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
