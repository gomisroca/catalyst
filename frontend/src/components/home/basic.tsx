// Hook Imports
import { useEffect, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
// Component Imports
import PaginationWrapper from '@/components/pagination-wrapper';
import { ProjectCard } from '@/components/project/project-card';
// Util Imports
import { getProjects } from '@/lib/projects';
import { shuffle } from '@/lib/utils';

export default function HomeBasic() {
  const { data: user, isLoading: userLoading, error: userError } = useGetSelf();
  const [projects, setProjects] = useState<Project[]>();
  const [paginatedProjects, setPaginatedProjects] = useState<Project[]>();
  const [page, setPage] = useState<number>(1);
  const pageCount = 5;

  useEffect(() => {
    async function fetchProjects() {
      const projs: Project[] = await getProjects();
      const filteredProjects = projs.filter(
        (proj) =>
          proj.permissions.private == false ||
          (user && (proj.author.id == user.id || proj.permissions.allowedUsers.includes(user.id)))
      );
      shuffle(filteredProjects);
      setProjects(filteredProjects);
    }
    fetchProjects();
  }, [user]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    function paginate(projects: Project[]) {
      const paginated = projects.slice((page - 1) * pageCount, page * pageCount);
      setPaginatedProjects(paginated);
    }

    if (projects) {
      paginate(projects);
    }
  }, [projects, page]);

  if (userLoading) {
    return <Loading />;
  }
  if (userError) {
    return <Error message={userError?.message} />;
  }
  return (
    <div className="flex w-full flex-col gap-4">
      {projects && projects.length > pageCount && (
        <PaginationWrapper onPageChange={handlePageChange} page={page} pageCount={pageCount} data={projects} />
      )}
      {paginatedProjects &&
        paginatedProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
    </div>
  );
}
