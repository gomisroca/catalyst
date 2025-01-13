// Base Imports
import { Link } from 'react-router-dom';
// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { BsActivity, BsFire } from 'react-icons/bs';
import { Pencil } from 'lucide-react';

function ProjectDetails({ project, user }: { project: Project; user?: BasicUser }) {
  return (
    <div className="flex items-center gap-2 px-4">
      <Avatar className="rounded-md">
        <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + project.avatar}`} />
        <AvatarFallback>{project.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <CardDescription>
          {project.author.nickname || project.author.username}
          <Link to={`/profile/${project.author.id}`} className="hover:text-gray-500" data-testid="author-link">
            @{project.author.username}
          </Link>
        </CardDescription>
        <CardTitle className="flex gap-2">
          {project.name}
          {project.trendingActivity && <BsActivity className="text-green-500" />}
          {project.trendingPopularity && <BsFire className="text-orange-500" />}
          {user?.id === project.author.id && (
            <Link to={`/${project.id}/update`}>
              <Pencil aria-label="Edit project" className="h-4 w-4" />
            </Link>
          )}
        </CardTitle>
        <CardDescription className="flex gap-1">
          {new Date(project.createdAt).toLocaleDateString()}•{new Date(project.updatedAt).toLocaleDateString()}
        </CardDescription>
      </div>
    </div>
  );
}

export default ProjectDetails;
