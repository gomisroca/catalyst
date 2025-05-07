'use client';

// Libraries
import { useEffect, useRef, useState } from 'react';
import { type Session } from 'next-auth';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// Components
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';
// Types
import { type ExtendedProject, type ExtendedBranch } from 'types';

// Define the interface for the Bookmark type and the SidebarData type
interface Bookmark {
  createdAt: Date;
  postId?: string | null;
  branchId?: string | null;
  projectId?: string | null;
  postTitle?: string | null;
  branchName?: string | null;
  projectName?: string | null;
}
interface SidebarData {
  contributions: {
    projects: ExtendedProject[];
    branches: ExtendedBranch[];
  };
  bookmarks: Bookmark[];
}

function SidebarProjects({ projects }: { projects: ExtendedProject[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h4 className="text-lg font-semibold">Projects</h4>
      {projects.length === 0 ? (
        <p className="text-center text-xs">You have no projects yet.</p>
      ) : (
        projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="w-full text-center">
            {project.name}
          </Link>
        ))
      )}
    </div>
  );
}

function SidebarBranches({ branches }: { branches: ExtendedBranch[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h4 className="text-lg font-semibold">Branches</h4>
      {branches.length === 0 ? (
        <p className="text-center text-xs">You have no branches yet.</p>
      ) : (
        branches.map((branch) => (
          <Link href={`/projects/${branch.projectId}/${branch.id}`} key={branch.id} className="w-full text-center">
            {branch.name}
          </Link>
        ))
      )}
    </div>
  );
}

function SidebarBookmarks({ bookmarks }: { bookmarks: Bookmark[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h4 className="text-lg font-semibold">Bookmarks</h4>
      {bookmarks.length === 0 ? (
        <p className="text-center text-xs">You have no bookmarks yet.</p>
      ) : (
        bookmarks.map((bookmark) =>
          bookmark.postId ? (
            <Link
              href={`/projects/${bookmark.projectId}/${bookmark.branchId}`}
              key={bookmark.postId}
              className="w-full text-center">
              {bookmark.postTitle}
            </Link>
          ) : bookmark.branchId ? (
            <Link
              href={`/projects/${bookmark.projectId}/${bookmark.branchId}`}
              key={bookmark.branchId}
              className="w-full text-center">
              {bookmark.projectName} - {bookmark.branchName}
            </Link>
          ) : (
            <Link href={`/projects/${bookmark.projectId}`} key={bookmark.projectId} className="w-full text-center">
              {bookmark.projectName}
            </Link>
          )
        )
      )}
    </div>
  );
}

// Define a function to render the sidebar content
function SidebarContent({ session, data }: { session: Session | null; data: SidebarData }) {
  if (!session) return null; // If the user is not logged in, we have nothing to render

  // Render the user's contributions to projects and branches as well as their bookmarks
  return (
    <nav className="flex min-h-16 w-42 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-950">
      <SidebarProjects projects={data.contributions.projects} />
      <hr className="w-full border border-zinc-300 dark:border-zinc-700" />
      <SidebarBranches branches={data.contributions.branches} />
      <hr className="w-full border border-zinc-300 dark:border-zinc-700" />
      <SidebarBookmarks bookmarks={data.bookmarks} />
    </nav>
  );
}

export default function Sidebar({ session, data }: { session: Session | null; data: SidebarData }) {
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Define a function to handle clicks outside the menu so it closes
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <aside ref={menuRef} className="absolute top-0 bottom-0 left-0 mt-10 flex h-fit w-50 flex-col gap-4 p-4">
      <Button
        name="sidebar"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full">
        {!open ? <FaCircleChevronDown size={20} /> : <FaCircleChevronUp size={20} />}
      </Button>
      <div ref={parent} className="relative z-[999]">
        {open && <SidebarContent session={session} data={data} />}
      </div>
    </aside>
  );
}
