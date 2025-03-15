'use client';

import { type Session } from 'next-auth';
import { useState } from 'react';
import HomeTabs from './tabs';
import TrendingTimeline from './trending-timeline';
import ForYouTimeline from './foryou-timeline';

export default function HomeTimelineWrapper({ session }: { session: Session | null }) {
  const [tab, setTab] = useState('trending');

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <HomeTabs tab={tab} setTab={setTab} />
      {tab === 'for-you' ? <ForYouTimeline session={session} /> : <TrendingTimeline />}
    </div>
  );
}
