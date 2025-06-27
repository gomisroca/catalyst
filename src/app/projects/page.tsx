import { ProjectCard } from '@/app/_components/cards';
import { getProjects } from '@/server/queries/projects';

export default async function ProjectList() {
  const data = await getProjects();

  return (
    <div className="flex flex-col gap-2">
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
