import { getProjects } from '@/server/queries/projects';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectList() {
  const data = await getProjects();
  if (!data) return null;
  return (
    <>
      {data.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="group flex flex-col rounded-lg border-2 border-zinc-300 bg-zinc-200 drop-shadow-sm transition duration-200 ease-in-out hover:drop-shadow-md active:scale-90 active:rotate-[-1deg] active:drop-shadow-none active:duration-100 dark:border-zinc-700 dark:bg-zinc-800">
          <h1 className="rounded-t-lg bg-zinc-200 px-4 py-2 text-lg font-bold transition duration-200 ease-in-out group-hover:bg-zinc-300 dark:bg-zinc-800 group-hover:dark:bg-zinc-900">
            {project.name}
          </h1>
          {project.picture && (
            <Image
              src={project.picture}
              alt="Project Picture"
              width={300}
              height={300}
              className="rounded-b-lg transition duration-200 ease-in-out group-hover:contrast-125"
            />
          )}
        </Link>
      ))}
    </>
  );
}
