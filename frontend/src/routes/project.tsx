import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { getProject } from '@/lib/projects';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import CreateBranchButton from '@/components/project/create-branch-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BsActivity, BsFire } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProjectEditForm } from '@/components/project/project-edit-form';
import { useGetSelf } from '@/hooks/users/useGetSelf';

export default function Project() {
  const [open, setOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setOpen(false);
  };

  const { data: user } = useGetSelf();

  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [branches, setBranches] = useState<Branch[]>();

  useEffect(() => {
    async function fetchProject(projectId: string) {
      const proj: Project = await getProject(projectId);
      setProject(proj);
      console.log(proj);
      // Most popular and active branches at the top
      const sortedBranches = proj.branches.sort((a, b) => b.popularity + b.activity - (a.popularity + a.activity));
      // Then we check that the branches are public or the user is the author
      const publicBranches = sortedBranches.filter(
        (branch) =>
          branch.permissions.private == false ||
          (user && (branch.author.id == user.id || branch.permissions.allowedUsers.includes(user.id)))
      );
      // If there's a user, of all public or owned branches, we check if the user has reported or hidden them
      if (user) {
        for (const branch of publicBranches) {
          if (
            branch.interactions.filter((int) => (int.type == 'REPORT' || int.type == 'HIDE') && int.user.id == user.id)
              .length > 0
          ) {
            const index = publicBranches.indexOf(branch);
            if (index > -1) {
              publicBranches.splice(index, 1);
            }
          }
        }
      }
      setBranches(publicBranches);
    }

    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId, user]);

  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<string>();
  useEffect(() => {
    if (selectedBranch && selectedBranch !== 'null') {
      navigate(selectedBranch);
      setSelectedBranch('null');
    }
  }, [selectedBranch, navigate]);

  return (
    <div className="flex w-full flex-col gap-2">
      {project && (
        <Card className="w-full p-4">
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
                {user?.id == project.author.id && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Edit Project</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="w-5/6 rounded-md">
                      <ProjectEditForm onSubmitSuccess={handleSubmitSuccess} project={project} />
                    </DialogContent>
                  </Dialog>
                )}
              </CardTitle>
              <CardDescription className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">
                      {`${new Date(project.createdAt).toLocaleDateString()}`}
                    </TooltipTrigger>
                    <TooltipContent>Created</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                •
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">
                      {`${new Date(project.updatedAt).toLocaleDateString()}`}
                    </TooltipTrigger>
                    <TooltipContent>Updated</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
            </div>
          </div>
          <CardContent className="p-4">{project.description}</CardContent>
          <CardFooter className="flex flex-col gap-2">
            {branches && branches.length > 0 ? (
              <>
                <span className="text-lg">Branches</span>
                <Select onValueChange={(e) => setSelectedBranch(e)} value={selectedBranch}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {(project.author.id == user?.id || project.permissions.allowBranch) && (
                      <CreateBranchButton project={project} />
                    )}
                    <SelectItem className="hidden" value={'null'}>
                      --
                    </SelectItem>
                    {branches &&
                      branches.map(
                        (branch) =>
                          branch.permissions.allowBranch && (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name}
                            </SelectItem>
                          )
                      )}
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <span>This project has no branches yet.</span>
                <CreateBranchButton project={project} />
              </>
            )}
          </CardFooter>
        </Card>
      )}
      <Outlet />
    </div>
  );
}
