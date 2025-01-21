// Hook Imports
import { useGetProjects } from '@/hooks/projects/useGetProjects';
// UI Imports
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
// Component Imports
import ProjectCard from '@/components/project/project-card';
import { Fragment, useEffect, useRef } from 'react';

export default function HomeBasic() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error: projectsError } = useGetProjects({});
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (projectsError) return <Error message={projectsError?.message} />;
  if (!data) return <Error message="Failed to load projects" />;
  return (
    <div className="flex w-full flex-col gap-4">
      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Fragment>
      ))}

      <div ref={observerTarget} />
      {isFetchingNextPage && <Loading />}
    </div>
  );
}
