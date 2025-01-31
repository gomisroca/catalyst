import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import ProjectDetails from './project-details';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={project.id} className="relative">
      <Card className="p-4">
        <ProjectDetails project={project} />
        <CardContent className="p-4">{project.description}</CardContent>
      </Card>
    </Link>
  );
}
