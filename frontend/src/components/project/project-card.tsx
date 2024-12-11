import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BsFire, BsActivity } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <>
      <Link to={project.id}>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage
                className="rounded-sm"
                src={`${import.meta.env.VITE_BACKEND_ORIGIN}/images/${project.avatar}`}
              />
              <AvatarFallback>{project.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardDescription>
                {project.author.nickname || project.author.username}
                <Link to={`/profile/${project.author.id}`} className="hover:text-gray-500">
                  @{project.author.username}
                </Link>
              </CardDescription>
              <CardTitle className="flex gap-2">
                {project.name}
                {project.trendingActivity && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BsActivity className="text-green-500" />
                      </TooltipTrigger>
                      <TooltipContent>Active</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {project.trendingPopularity && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BsFire className="text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent>Popular</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardTitle>
              <CardDescription>{`${new Date(project.createdAt).toLocaleDateString()}`}</CardDescription>
            </div>
          </div>
          <CardContent className="p-4">{project.description}</CardContent>
        </Card>
      </Link>
    </>
  );
}
