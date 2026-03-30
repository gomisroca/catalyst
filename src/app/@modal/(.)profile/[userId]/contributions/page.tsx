import { renderCard } from '@/app/_components/cards';
import Modal from '@/app/_components/ui/modal';
import { getUserContributions } from '@/server/queries/users';

export default async function ProfileContributionsModal({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);

  if (data.length === 0) return <p className="text-center text-zinc-500">No contributions yet.</p>;

  return (
    <Modal>
      <ul className="grid grid-cols-1 gap-4">{data.map(renderCard)}</ul>
    </Modal>
  );
}
