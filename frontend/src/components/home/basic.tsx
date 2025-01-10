// Hook Imports
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useGetProjects } from '@/hooks/projects/useGetProjects';
// UI Imports
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
// Component Imports
import ProjectCard from '@/components/project/project-card';

// Util Functions
function calculateScore(project: Project) {
  // Define weights for interactions and activity
  const interactionWeight = 0.3;
  const activityWeight = 0.7;

  // Calculate score based on interactions and activity
  const score = project.popularity * interactionWeight + project.activity * activityWeight;

  return score;
}

function filterPrivateProjects(projects: Project[], user?: BasicUser) {
  return (
    projects.filter(
      (proj) =>
        proj.permissions.private === false ||
        (user && (proj.author.id === user.id || proj.permissions.allowedUsers.includes(user.id)))
    ) ?? []
  );
}

function weightedShuffle(projects: Project[], user?: BasicUser) {
  let availableProjects = filterPrivateProjects(projects, user);
  for (let i = availableProjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Calculate scores for projects at indices i and j
    const scoreI = calculateScore(availableProjects[i]);
    const scoreJ = calculateScore(availableProjects[j]);

    // Swap projects based on scores
    if (scoreI < scoreJ) {
      [availableProjects[i], availableProjects[j]] = [availableProjects[j], availableProjects[i]];
    }
  }
  return availableProjects;
}

export default function HomeBasic() {
  const { data: user, isLoading: userLoading, error: userError } = useGetSelf();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useGetProjects();

  if (userLoading || projectsLoading) return <Loading />;
  if (userError || projectsError) return <Error message={userError?.message || projectsError?.message} />;
  if (!projects) return <Error message="Failed to load projects" />;

  const filteredProjects = weightedShuffle(projects, user);

  return (
    <div className="flex w-full flex-col gap-4">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
