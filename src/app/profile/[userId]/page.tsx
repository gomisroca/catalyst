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
    <Link
      href={`/projects/${project.id}`}
      key={project.id}
      className="group flex rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
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
        <header className="flex items-center justify-between rounded-tr-lg bg-white px-4 py-2 transition duration-200 ease-in-out dark:bg-black">
          <h1 className="text-lg font-bold">{project.name}</h1>
          <p className="text-zinc-400">{project.updatedAt.toLocaleDateString()}</p>
        </header>
        <div className="px-4 py-2">{project.description}</div>
      </section>
    </Link>
  );
}

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <Link
      href={`/projects/${branch.projectId}/${branch.id}`}
      key={branch.id}
      className="group flex rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
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
        <header className="flex items-center justify-between rounded-tr-lg bg-white px-4 py-2 transition duration-200 ease-in-out dark:bg-black">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">{branch.projectName}</h1>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-zinc-500">
              <FaCodeBranch size={16} /> {branch.name}
            </span>
          </div>
          <p className="text-zinc-400">{branch.updatedAt.toLocaleDateString()}</p>
        </header>
        <div className="px-4 py-2">{branch.description}</div>
      </section>
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <li
      key={post.id}
      className="group flex flex-col rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      <header className="flex items-center justify-between rounded-t-lg bg-white px-4 py-2 transition duration-200 ease-in-out dark:bg-black">
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${post.projectId}`}
            className="text-lg font-bold transition duration-200 ease-in-out hover:text-zinc-700 hover:dark:text-zinc-300">
            {post.projectName}
          </Link>
          <span>•</span>
          <Link
            href={`/projects/${post.projectId}/${post.branchId}`}
            className="flex items-center gap-1 font-bold text-zinc-500 transition duration-200 ease-in-out hover:text-zinc-600 hover:dark:text-zinc-400">
            <FaCodeBranch size={16} /> {post.branchName}
          </Link>
        </div>
        <p className="text-zinc-400">{post.updatedAt.toLocaleDateString()}</p>
      </header>
      <section className="px-4 py-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-zinc-500">{post.content}</p>
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

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
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
