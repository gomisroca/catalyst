import NotAllowed from '@/app/_components/not-allowed';
import CreateProjectForm from '@/app/projects/create/create-project-form';
import { auth } from '@/server/auth';

export default async function CreateProject() {
  const session = await auth();
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Project</h1>
      <CreateProjectForm />
    </div>
  );
}
