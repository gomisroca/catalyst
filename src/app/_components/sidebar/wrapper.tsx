import { getUserSidebar } from '@/server/queries/users';
import { type Session } from 'next-auth';
import Sidebar from '.';

export default async function SidebarWrapper({ session }: { session: Session | null }) {
  if (!session) return null;

  // Fetch the user's sidebar data server side
  const data = await getUserSidebar(session.user.id);

  // Pass the data to the sidebar component
  return <Sidebar session={session} data={data} />;
}
