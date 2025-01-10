// Hook Imports
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useGetProject } from '@/hooks/projects/useGetProject';
// UI Imports
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Error from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { FiPlus } from 'react-icons/fi';
import ProjectDetails from '@/components/project/project-details';

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
function CreateBranchButton({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="mb-2 flex w-full items-center"
      onClick={() => navigate(`/projects/${project.id}/new`)}
    >
      <FiPlus className="mr-2 h-4 w-4" /> Add Branch
    </Button>
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
                <CreateBranchButton project={project} />
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
          <CreateBranchButton project={project} />
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
