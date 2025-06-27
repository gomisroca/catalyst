/**
 * Server-side wrapper for the sidebar component. Fetches the user's sidebar data from the server and passes it to the sidebar component.
 */

import { type Session } from 'next-auth';

import Sidebar from '@/app/_components/sidebar';
import { getUserSidebar } from '@/server/queries/users';

export default async function SidebarWrapper({ session }: { session: Session | null }) {
  if (!session) return null;

  // Fetch the user's sidebar data server side
  const data = await getUserSidebar(session.user.id);

  // Pass the data to the sidebar component
  return <Sidebar session={session} data={data} />;
}
