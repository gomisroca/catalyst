import { getBranch } from '@/server/queries/branches';

export default async function BranchPage({
  params,
  children,
}: {
  params: Promise<{ projectId: string; branchId: string }>;
  children: React.ReactNode;
}) {
  const data = await getBranch((await params).branchId);
  if (!data) return null;

  return (
    <main>
      <header>
        <h1>{data.name}</h1>
        Here will be a description of the branch, maybe a header section with some details like date of creation, number
        of contributions, interactions, etc
      </header>
      {/* Here will come the list of posts */}
      <section>{children}</section>
    </main>
  );
}
