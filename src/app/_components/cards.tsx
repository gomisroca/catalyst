/**
 * Card components for displaying projects, branches, posts, and interactions.
 *
 * @example
 * <ProjectCard project={project} />
 */

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark, FaCodeBranch, FaShare, FaStar } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import {
  type ExtendedBranch,
  type ExtendedBranchInteraction,
  type ExtendedPost,
  type ExtendedPostInteraction,
  type ExtendedProject,
  type ExtendedProjectInteraction,
  type TimelineItem,
} from 'types';

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK';

function isRenderableInteraction(type: string): type is InteractionType {
  return type in interactionIcons;
}

function BaseCard({
  header,
  children,
  image,
  imageAlt,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <li className="group flex h-36 max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition-all duration-200 ease-in-out hover:bg-white hover:drop-shadow-md active:scale-95 active:duration-100 dark:bg-zinc-800 dark:hover:bg-black">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ''}
          width={144}
          height={144}
          className="h-full w-auto rounded-l-lg object-cover transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={twMerge(
            'flex flex-col items-center justify-between gap-1 bg-white/50 px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black/30',
            image ? 'rounded-tr-lg' : 'rounded-t-lg'
          )}>
          {header}
        </header>
        <section className="my-2 overflow-hidden px-2 md:px-4">{children}</section>
      </div>
    </li>
  );
}

// Helper function to format date
function formatDate(date: Date) {
  return format(date, 'dd/MM/yyyy');
}

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <BaseCard
      image={project.picture ?? undefined}
      imageAlt={project.name + ' Picture'}
      header={
        <>
          <Link
            href={`/projects/${project.id}/`}
            className="line-clamp-1 w-full leading-3 font-bold transition duration-200 ease-in-out hover:underline md:w-auto">
            {project.name}
          </Link>
          <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto">{formatDate(project.updatedAt!)}</p>
        </>
      }>
      <p className="line-clamp-2 text-zinc-500">{project.description}</p>
    </BaseCard>
  );
}

export function BranchCard({ branch }: { branch: ExtendedBranch }) {
  return (
    <BaseCard
      image={branch.project.picture ?? undefined}
      imageAlt={branch.project.name + ' Picture'}
      header={
        <>
          <div className="flex w-full flex-col items-start gap-1 md:w-auto md:flex-row md:items-center md:gap-2">
            <Link
              href={`/projects/${branch.projectId}/`}
              className="line-clamp-1 text-sm leading-3 font-bold transition duration-200 ease-in-out hover:underline">
              {branch.project.name}
            </Link>
            <span className="hidden leading-3 md:block">•</span>
            <Link
              href={`/projects/${branch.projectId}/${branch.id}`}
              className="line-clamp-1 flex items-center gap-1 leading-3 font-bold text-zinc-500 transition duration-200 ease-in-out hover:underline">
              <FaCodeBranch size={14} /> {branch.name}
            </Link>
          </div>
          <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto">{formatDate(branch.updatedAt!)}</p>
        </>
      }>
      <p className="line-clamp-2 text-zinc-500">{branch.description}</p>
    </BaseCard>
  );
}

export function PostCard({ post }: { post: ExtendedPost }) {
  return (
    <BaseCard
      header={
        <>
          <div className="flex w-full flex-col items-start text-sm md:w-auto md:flex-row md:items-center md:gap-2 md:text-base">
            <Link
              href={`/projects/${post.branch.projectId}`}
              className="text-sm leading-3 font-bold transition duration-200 ease-in-out hover:underline md:text-base">
              {post.branch.project.name}
            </Link>
            <span className="hidden leading-3 md:block">•</span>
            <Link
              href={`/projects/${post.branch.projectId}/${post.branch.id}`}
              className="flex items-center gap-1 text-sm leading-3 font-bold text-zinc-500 transition duration-200 ease-in-out hover:underline md:text-base">
              <FaCodeBranch size={14} /> {post.branch.name}
            </Link>
          </div>
          <p className="w-full text-sm leading-3 text-zinc-400 md:w-auto">{formatDate(post.updatedAt!)}</p>
        </>
      }>
      <h3 className="text-xl leading-3 font-semibold">{post.title}</h3>
      <p className="line-clamp-2 text-zinc-500">{post.content}</p>
    </BaseCard>
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

function InteractionHeader({
  type,
  label,
  createdAt,
}: {
  type: 'LIKE' | 'SHARE' | 'BOOKMARK';
  label: string;
  createdAt: Date;
}) {
  return (
    <>
      <p className="flex w-full items-center justify-start gap-1 font-semibold text-zinc-500">
        {interactionIcons[type].icon} {interactionIcons[type].text} a {label}
      </p>
      <p className="w-full text-zinc-400 md:w-auto">{createdAt.toLocaleDateString()}</p>
    </>
  );
}

function InteractionBody({
  title,
  userId,
  userName,
  description,
}: {
  title: string;
  userId: string;
  userName: string;
  description: string | null;
}) {
  return (
    <>
      <div className="flex justify-between font-semibold">
        <h3 className="flex-1 text-xl">{title}</h3>
        <div className="flex gap-1 text-zinc-400">
          <span className="font-normal">by</span>
          <Link href={`/profile/${userId}`} className="transition duration-200 ease-in-out hover:underline">
            {userName}
          </Link>
        </div>
      </div>
      <p className="line-clamp-2 text-zinc-500">{description}</p>
    </>
  );
}

export function ProjectInteractionCard({ interaction }: { interaction: ExtendedProjectInteraction }) {
  if (!isRenderableInteraction(interaction.type)) return null;
  return (
    <BaseCard
      header={
        <InteractionHeader
          type={interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK'}
          label="project"
          createdAt={interaction.createdAt}
        />
      }>
      <InteractionBody
        title={interaction.project.name}
        userId={interaction.user.id}
        userName={interaction.user.name ?? interaction.user.email.split('@')[0]!}
        description={interaction.project.description}
      />
    </BaseCard>
  );
}

export function BranchInteractionCard({ interaction }: { interaction: ExtendedBranchInteraction }) {
  if (!isRenderableInteraction(interaction.type)) return null;
  return (
    <BaseCard
      header={
        <InteractionHeader
          type={interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK'}
          label="branch"
          createdAt={interaction.createdAt}
        />
      }>
      <InteractionBody
        title={interaction.branch.name}
        userId={interaction.user.id}
        userName={interaction.user.name ?? interaction.user.email.split('@')[0]!}
        description={interaction.branch.description}
      />
    </BaseCard>
  );
}

export function PostInteractionCard({ interaction }: { interaction: ExtendedPostInteraction }) {
  if (!isRenderableInteraction(interaction.type)) return null;
  return (
    <BaseCard
      header={
        <InteractionHeader
          type={interaction.type as 'LIKE' | 'SHARE' | 'BOOKMARK'}
          label="post"
          createdAt={interaction.createdAt}
        />
      }>
      <InteractionBody
        title={interaction.post.title}
        userId={interaction.user.id}
        userName={interaction.user.name ?? interaction.user.email.split('@')[0]!}
        description={interaction.post.content}
      />
    </BaseCard>
  );
}

export function renderCard(item: TimelineItem) {
  switch (item.type) {
    case 'project':
      return <ProjectCard key={item.content.id} project={item.content} />;
    case 'branch':
      return <BranchCard key={item.content.id} branch={item.content} />;
    case 'post':
      return <PostCard key={item.content.id} post={item.content} />;
    case 'project-interaction':
      return <ProjectInteractionCard key={item.content.id} interaction={item.content} />;
    case 'branch-interaction':
      return <BranchInteractionCard key={item.content.id} interaction={item.content} />;
    case 'post-interaction':
      return <PostInteractionCard key={item.content.id} interaction={item.content} />;
  }
}
