// Libraries
import { type Session } from 'next-auth';
// Components
import Sidebar from '@/app/_components/sidebar';
// Actions
import { getUserSidebar } from '@/server/queries/users';

export default async function SidebarWrapper({ session }: { session: Session | null }) {
  if (!session) return null;

  // Fetch the user's sidebar data server side
  const data = await getUserSidebar(session.user.id);

  // Pass the data to the sidebar component
  return <Sidebar session={session} data={data} />;
}
