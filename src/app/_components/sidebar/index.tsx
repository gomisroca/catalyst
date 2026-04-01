'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useRef, useState } from 'react';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import { type ExtendedBranch, type ExtendedProject } from 'types';

import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';

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
    projects: { type: 'project'; content: ExtendedProject }[];
    branches: { type: 'branch'; content: ExtendedBranch }[];
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
              href={`/projects/${bookmark.projectId}/${bookmark.branchId}/${bookmark.postId}`}
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
            <Link
              href={`/projects/${bookmark.projectId}`}
              key={bookmark.projectId ?? bookmark.createdAt.toISOString()}
              className="w-full text-center">
              {bookmark.projectName}
            </Link>
          )
        )
      )}
    </div>
  );
}

function SidebarContent({ data }: { data: SidebarData }) {
  return (
    <nav className="flex min-h-16 w-44 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-300 px-4 py-2 dark:bg-zinc-800">
      <SidebarProjects projects={data.contributions.projects.map((p) => p.content)} />
      <hr className="w-full border border-white dark:border-black" />
      <SidebarBranches branches={data.contributions.branches.map((b) => b.content)} />
      <hr className="w-full border border-white dark:border-black" />
      <SidebarBookmarks bookmarks={data.bookmarks} />
    </nav>
  );
}

export default function Sidebar({ data }: { data: SidebarData }) {
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <aside ref={menuRef} className="fixed top-0 bottom-0 left-0 mt-10 flex h-fit w-52 flex-col gap-4 p-4">
      <Button arialabel="sidebar" onClick={() => setOpen(!open)} className="w-fit">
        {open ? <FaCircleChevronUp size={20} /> : <FaCircleChevronDown size={20} />}
      </Button>
      <div ref={parent} className="relative z-50">
        {open && <SidebarContent data={data} />}
      </div>
    </aside>
  );
}
