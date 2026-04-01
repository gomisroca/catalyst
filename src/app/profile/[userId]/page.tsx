import { renderCard } from '@/app/_components/cards';
import { getUserProfileTimeline } from '@/server/queries/users';

export default async function ProfileTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserProfileTimeline((await params).userId);

  if (data.length === 0) return <p className="text-center text-zinc-500">No activity yet.</p>;

  return <ul className="grid grid-cols-1 gap-4">{data.map(renderCard)}</ul>;
}
