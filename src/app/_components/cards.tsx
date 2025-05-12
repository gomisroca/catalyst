/**
 * Card components for displaying projects, branches, posts, and interactions.
 *
 * @example
 * <ProjectCard project={project} />
 */

// Libraries
import { format } from 'date-fns';
// Components
import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark, FaCodeBranch, FaShare, FaStar } from 'react-icons/fa6';
// Types
import {
  type ExtendedBranch,
  type ExtendedPost,
  type ExtendedProject,
  type ExtendedBranchInteraction,
  type ExtendedPostInteraction,
  type ExtendedProjectInteraction,
} from 'types';

// Helper function to format date
function formatDate(date: Date) {
  return format(date, 'dd/MM/yyyy');
}

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <li
      key={project.id}
      className="group flex max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      {project.picture && (
        <Image
          src={project.picture}
          alt={project.name + ' Picture'}
          width={150}
          height={150}
          className="rounded-l-lg transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col">
        <header className="flex flex-col items-start justify-between gap-1 rounded-tr-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:items-center md:px-4 dark:bg-black">
          <Link
            href={`/projects/${project.id}/`}
            className="w-full leading-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:w-auto md:text-lg dark:hover:text-rose-700">
            {project.name}
          </Link>
          <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto md:text-base">
            {formatDate(project.updatedAt!)}
          </p>
        </header>
        <div className="my-2 line-clamp-5 px-2 md:px-4">{project.description}</div>
      </section>
    </li>
  );
}

export function BranchCard({ branch }: { branch: ExtendedBranch }) {
  return (
    <li
      key={branch.id}
      className="group flex max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      {branch.project.picture && (
        <Image
          src={branch.project.picture}
          alt={branch.project.name + ' Picture'}
          width={150}
          height={150}
          className="rounded-l-lg transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col">
        <header className="flex flex-col items-center justify-between gap-1 rounded-tr-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
          <div className="flex w-full flex-col items-start gap-1 md:w-auto md:flex-row md:items-center md:gap-2">
            <Link
              href={`/projects/${branch.projectId}/`}
              className="text-sm leading-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:text-base dark:hover:text-rose-700">
              {branch.project.name}
            </Link>
            <span className="hidden leading-3 md:block">•</span>
            <Link
              href={`/projects/${branch.projectId}/${branch.id}`}
              className="flex items-center gap-1 leading-3 font-bold text-zinc-500 transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 dark:hover:text-rose-700">
              <FaCodeBranch size={14} /> {branch.name}
            </Link>
          </div>
          <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto md:text-base">
            {formatDate(branch.updatedAt!)}
          </p>
        </header>
        <div className="my-2 line-clamp-5 px-2 md:px-4">{branch.description}</div>
      </section>
    </li>
  );
}

export function PostCard({ post }: { post: ExtendedPost }) {
  return (
    <li
      key={post.id}
      className="group flex max-w-full flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex flex-col items-center justify-between rounded-t-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
        <div className="flex w-full flex-col items-start text-sm md:w-auto md:flex-row md:items-center md:gap-2 md:text-base">
          <Link
            href={`/projects/${post.branch.projectId}`}
            className="text-sm leading-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:text-base dark:hover:text-rose-700">
            {post.branch.project.name}
          </Link>
          <span className="hidden leading-3 md:block">•</span>
          <Link
            href={`/projects/${post.branch.projectId}/${post.branch.id}`}
            className="flex items-center gap-1 text-sm leading-3 font-bold text-zinc-500 transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:text-base dark:hover:text-rose-700">
            <FaCodeBranch size={14} /> {post.branch.name}
          </Link>
        </div>
        <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto md:text-base">
          {post.updatedAt!.toLocaleDateString()}
        </p>
      </header>
      <section className="my-2 flex flex-col gap-2 px-2 md:px-4">
        <h3 className="text-xl leading-3 font-semibold">{post.title}</h3>
        <p className="line-clamp-5 text-zinc-500">{post.content}</p>
        <div className="flex flex-wrap gap-2">
          {post.media.map((media) => (
            <Image
              src={media.url}
              alt={media.name}
              height={150}
              width={300}
              className="max-h-40 w-auto rounded-lg"
              key={media.id}
            />
          ))}
        </div>
      </section>
    </li>
  );
}

// Icons for interactions
const interactionIcons = {
  LIKE: {
    text: 'Liked',
    icon: <FaStar size={16} />,
  },
  SHARE: {
    text: 'Shared',
    icon: <FaShare size={16} />,
  },
  BOOKMARK: {
    text: 'Saved',
    icon: <FaBookmark size={16} />,
  },
};

export function ProjectInteractionCard({ interaction }: { interaction: ExtendedProjectInteraction }) {
  const type = interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK';
  return (
    <li
      key={interaction.id}
      className="group flex max-w-full flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex flex-col items-center justify-between rounded-t-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
        <p className="flex w-full items-center justify-start gap-1 font-semibold text-zinc-500">
          {interactionIcons[type].icon} {interactionIcons[type].text} a project
        </p>
        <p className="w-full text-zinc-400 md:w-auto">{interaction.createdAt.toLocaleDateString()}</p>
      </header>
      <section className="my-2 px-2 md:px-4">
        <div className="flex justify-between font-semibold">
          <h3 className="flex-1 text-xl">{interaction.project.name}</h3>
          <div className="flex gap-1 text-zinc-400">
            <span className="font-normal">by</span>
            <Link
              href={`/profile/${interaction.user.id}`}
              className="transition duration-200 ease-in-out hover:text-zinc-600">
              {interaction.user.name ?? interaction.user.email.split('@')[0]}
            </Link>
          </div>
        </div>
        <p className="line-clamp-5 text-zinc-500">{interaction.project.description}</p>
      </section>
    </li>
  );
}

export function BranchInteractionCard({ interaction }: { interaction: ExtendedBranchInteraction }) {
  const type = interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK';
  return (
    <li
      key={interaction.id}
      className="group flex max-w-full flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex flex-col items-center justify-between rounded-t-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
        <p className="flex w-full items-center justify-start gap-1 font-semibold text-zinc-500">
          {interactionIcons[type].icon} {interactionIcons[type].text} a branch
        </p>
        <p className="w-full text-zinc-400 md:w-auto">{interaction.createdAt.toLocaleDateString()}</p>
      </header>
      <section className="my-2 px-2 md:px-4">
        <div className="flex justify-between font-semibold">
          <h3 className="flex-1 text-xl">{interaction.branch.name}</h3>
          <div className="flex gap-1 text-zinc-400">
            <span className="font-normal">by</span>
            <Link
              href={`/profile/${interaction.user.id}`}
              className="transition duration-200 ease-in-out hover:text-zinc-600">
              {interaction.user.name ?? interaction.user.email.split('@')[0]}
            </Link>
          </div>
        </div>
        <p className="line-clamp-5 text-zinc-500">{interaction.branch.description}</p>
      </section>
    </li>
  );
}

export function PostInteractionCard({ interaction }: { interaction: ExtendedPostInteraction }) {
  const type = interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK';
  return (
    <li
      key={interaction.id}
      className="group flex max-w-full flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex flex-col items-center justify-between rounded-t-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
        <p className="flex w-full items-center justify-start gap-1 font-semibold text-zinc-500">
          {interactionIcons[type].icon} {interactionIcons[type].text} a post
        </p>
        <p className="w-full text-zinc-400 md:w-auto">{interaction.createdAt.toLocaleDateString()}</p>
      </header>
      <section className="my-2 px-2 md:px-4">
        <div className="flex justify-between font-semibold">
          <h3 className="flex-1 text-xl">{interaction.post.title}</h3>
          <div className="flex gap-1 text-zinc-400">
            <span className="font-normal">by</span>
            <Link
              href={`/profile/${interaction.user.id}`}
              className="transition duration-200 ease-in-out hover:text-zinc-600">
              {interaction.user.name ?? interaction.user.email.split('@')[0]}
            </Link>
          </div>
        </div>
        <p className="line-clamp-5 text-zinc-500">{interaction.post.content}</p>
        {interaction.post.media && (
          <div className="flex flex-wrap">
            {interaction.post.media.map((media) => (
              <div key={media.id} className="h-10 w-10 p-2">
                <Image fill src={media.url} alt={media.name} />
              </div>
            ))}
          </div>
        )}
      </section>
    </li>
  );
}
