import { getProjects } from '@/server/queries/projects';
import Image from 'next/image';
import Link from '../_components/ui/link';

export default async function ProjectList() {
  const data = await getProjects();
  if (!data) return null;
  return (
    <>
      {data.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="group flex flex-col rounded-lg p-1 drop-shadow-sm hover:drop-shadow-md active:drop-shadow-none active:duration-100">
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
