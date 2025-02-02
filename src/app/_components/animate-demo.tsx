'use client';

import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function AnimateDemo() {
  const [message, setMessage] = useState<string[]>([]);
  const [parent, enableAnimations] = useAutoAnimate();
  const [enabled, setEnabled] = useState(true);

  const handleAnimations = (enabled: boolean) => {
    setEnabled(enabled);
    enableAnimations(enabled);
  };

  return (
    <div>
      <button
        className="rounded-md border-2 border-neutral-500 bg-neutral-700 p-2"
        onClick={() => setMessage((prev: string[]) => [...prev, 'Clicked!'])}>
        Click me
      </button>
      {message && (
        <div ref={parent} className="my-2 flex flex-col space-y-2">
          {message.map((item, index) => (
            <p className="rounded-md border border-neutral-200 bg-neutral-300 p-2 text-neutral-800" key={index}>
              {item}
            </p>
          ))}
        </div>
      )}
      <button className="rounded-md border-2 border-neutral-500 bg-neutral-700 p-2" onClick={() => setMessage([])}>
        Clear
      </button>
      <button
        className="rounded-md border-2 border-neutral-500 bg-neutral-700 p-2"
        onClick={() => handleAnimations(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Animations
      </button>
    </div>
  );
}
