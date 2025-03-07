import { getUserContributions } from '@/server/queries/users';
import Image from 'next/image';
import Link from 'next/link';
import { FaCodeBranch } from 'react-icons/fa6';

interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  picture: string | null;
}
interface Branch {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  projectId: string;
  projectName: string;
  projectPicture: string | null;
}
interface Post {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  projectName: string;
  projectId: string;
  branchName: string;
  branchId: string;
  media: Array<{ id: string; name: string; url: string }>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li
      key={project.id}
      className="group flex max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      {project.picture && (
        <Image
          src={project.picture}
          alt="Project Picture"
          width={150}
          height={150}
          className="rounded-l-lg transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col">
        <header className="flex flex-col items-center justify-between rounded-tr-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
          <Link
            href={`/projects/${project.id}/`}
            className="w-full font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:w-auto md:text-lg dark:hover:text-rose-700">
            {project.name}
          </Link>
          <p className="w-full text-zinc-400 md:w-auto">{project.updatedAt.toLocaleDateString()}</p>
        </header>
        <div className="my-2 line-clamp-5 px-2 md:px-4">{project.description}</div>
      </section>
    </li>
  );
}

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <li
      key={branch.id}
      className="group flex max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      {branch.projectPicture && (
        <Image
          src={branch.projectPicture}
          alt="Project Picture"
          width={150}
          height={150}
          className="rounded-l-lg transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col">
        <header className="flex flex-col items-center justify-between rounded-tr-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Link
              href={`/projects/${branch.projectId}/`}
              className="font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:text-lg dark:hover:text-rose-700">
              {branch.projectName}
            </Link>
            <span>•</span>
            <Link
              href={`/projects/${branch.projectId}/${branch.id}`}
              className="flex items-center gap-1 font-bold text-zinc-500 transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 dark:hover:text-rose-700">
              <FaCodeBranch size={16} /> {branch.name}
            </Link>
          </div>
          <p className="w-full text-zinc-400 md:w-auto">{branch.updatedAt.toLocaleDateString()}</p>
        </header>
        <div className="my-2 line-clamp-5 px-2 md:px-4">{branch.description}</div>
      </section>
    </li>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <li
      key={post.id}
      className="group flex max-w-full flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex flex-col items-center justify-between rounded-t-lg bg-white px-2 py-2 transition duration-200 ease-in-out md:flex-row md:px-4 dark:bg-black">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Link
            href={`/projects/${post.projectId}`}
            className="font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:text-lg dark:hover:text-rose-700">
            {post.projectName}
          </Link>
          <span>•</span>
          <Link
            href={`/projects/${post.projectId}/${post.branchId}`}
            className="flex items-center gap-1 font-bold text-zinc-500 transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 dark:hover:text-rose-700">
            <FaCodeBranch size={16} /> {post.branchName}
          </Link>
        </div>
        <p className="w-full text-zinc-400 md:w-auto">{post.updatedAt.toLocaleDateString()}</p>
      </header>
      <section className="my-2 px-2 md:px-4">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="line-clamp-5 text-zinc-500">{post.content}</p>
        <div className="flex flex-wrap">
          {post.media.map((media) => (
            <div key={media.id} className="h-10 w-10 p-2">
              <Image fill src={media.url} alt={media.name} />
            </div>
          ))}
        </div>
      </section>
    </li>
  );
}

export default async function ContributionsTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  if (!data) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <ul className="flex flex-col gap-2">
      {timelineItems.map((item) => {
        if (item.type === 'project') {
          return <ProjectCard key={item.id} project={item as Project} />;
        } else if (item.type === 'branch') {
          return <BranchCard key={item.id} branch={item as Branch} />;
        } else if (item.type === 'post') {
          return <PostCard key={item.id} post={item as Post} />;
        }
      })}
    </ul>
  );
}
