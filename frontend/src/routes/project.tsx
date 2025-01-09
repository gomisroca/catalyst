// Hook Imports
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useGetProject } from '@/hooks/projects/useGetProject';
// UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BsActivity, BsFire } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import Error from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { Pencil } from 'lucide-react';
import { FiPlus } from 'react-icons/fi';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// Component Imports
import { BranchUploadForm } from '@/components/branch/branch-upload-form';

// Utility Functions
const isPublicOrAuthor = (branch: Branch, user?: BasicUser) =>
  !branch.permissions.private ||
  user?.id === branch.author.id ||
  (user && branch.permissions.allowedUsers.includes(user.id));

const hasNoNegativeInteraction = (branch: Branch, user?: BasicUser) =>
  !user ||
  !branch.interactions.some(
    (interaction) => (interaction.type === 'REPORT' || interaction.type === 'HIDE') && interaction.user.id === user.id
  );

const filterAndSortBranches = (branches: Branch[], user?: BasicUser) => {
  if (!branches) return [];
  return branches
    .filter((branch) => isPublicOrAuthor(branch, user) && hasNoNegativeInteraction(branch, user))
    .sort((a, b) => b.popularity + b.activity - (a.popularity + a.activity));
};

// Branch Creation Dialog
function CreateBranchDialog({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button variant="outline" className="mb-2 flex w-full items-center">
          <FiPlus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-md">
        <BranchUploadForm onSubmitSuccess={closeDialog} project={project} />
      </DialogContent>
    </Dialog>
  );
}

// Project Details
function ProjectDetails({ project, user }: { project: Project; user?: BasicUser }) {
  const navigate = useNavigate();
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
            <Button asChild variant="outline" onClick={() => navigate(`/${project.id}/update`)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
        <CardDescription className="flex gap-1">
          {new Date(project.createdAt).toLocaleDateString()}•{new Date(project.updatedAt).toLocaleDateString()}
        </CardDescription>
      </div>
    </div>
  );
}

// Branch Selection
function BranchSelection({ project, branches, user }: { project: Project; branches: Branch[]; user?: BasicUser }) {
  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState<string>();

  // Navigate to selected branch
  useEffect(() => {
    if (selectedBranch && selectedBranch !== 'null') {
      navigate(selectedBranch);
      setSelectedBranch('');
    }
  }, [selectedBranch, navigate]);

  return (
    <CardFooter className="flex flex-col gap-2">
      {branches.length > 0 ? (
        <>
          <span className="text-lg">Branches</span>
          <Select onValueChange={setSelectedBranch} value={selectedBranch}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent>
              {(project.author.id === user?.id || project.permissions.allowBranch) && (
                <CreateBranchDialog project={project} />
              )}
              <SelectItem className="hidden" value="null">
                --
              </SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <>
          <span>This project has no branches yet.</span>
          <CreateBranchDialog project={project} />
        </>
      )}
    </CardFooter>
  );
}

export default function Project() {
  const { data: user } = useGetSelf();
  const { projectId } = useParams();

  const { data: project, isLoading, error } = useGetProject(projectId!);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!project) return <Error message="Project not found" />;

  const branches = filterAndSortBranches(project.branches, user);
  return (
    <div className="flex w-full flex-col gap-2">
      <Card className="w-full p-4">
        <ProjectDetails project={project} user={user} />
        <CardContent className="p-4">{project.description}</CardContent>
        <BranchSelection project={project} branches={branches} user={user} />
      </Card>
      <Outlet />
    </div>
  );
}
