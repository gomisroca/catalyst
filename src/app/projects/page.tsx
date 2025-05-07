import { Suspense } from 'react';
import ProjectList from './project-list';
import { LoadingSpinner } from '../_components/ui/loading-spinner';

export default async function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Projects</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}
