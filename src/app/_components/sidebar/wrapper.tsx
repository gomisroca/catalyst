import { type Session } from 'next-auth';

import Sidebar from '@/app/_components/sidebar';
import { getUserSidebar } from '@/server/queries/users';

export default async function SidebarWrapper({ session }: { session: Session | null }) {
  if (!session) return null;
  const data = await getUserSidebar(session.user.id);
  return <Sidebar data={data} />;
}
