import { getUserSidebar } from '@/server/queries/users';
import { type Session } from 'next-auth';
import Sidebar from '.';

export default async function SidebarWrapper({ session }: { session: Session | null }) {
  if (!session) {
    return null;
  }

  const data = await getUserSidebar(session.user.id);

  return <Sidebar session={session} data={data} />;
}
