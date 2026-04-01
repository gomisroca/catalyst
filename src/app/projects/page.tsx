import { ProjectCard } from '@/app/_components/cards';
import { getProjects } from '@/server/queries/projects';

export default async function ProjectList() {
  const data = await getProjects();

  if (data.length === 0) return <p className="text-center text-zinc-500">No projects yet.</p>;

  return (
    <ul className="grid grid-cols-1 gap-4">
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  );
}
