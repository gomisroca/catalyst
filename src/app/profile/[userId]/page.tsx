import { getUserProfile } from '@/server/queries/users';

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserProfile((await params).userId);

  if (!data) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Timeline</h2>
      <ul>
        {timelineItems.map((item) =>
          item.type === 'post' ? (
            <li key={item.id} className="mb-4">
              <div className="flex items-center">
                <span className="mr-2">{new Date(item.updatedAt).toLocaleString()}</span>
                <strong>{item.name}</strong>
                <span className="ml-2 text-sm text-gray-500">({item.type})</span>
              </div>
            </li>
          ) : item.type === 'branch' ? (
            <li key={item.id} className="mb-4">
              <div className="flex items-center">
                <span className="mr-2">{new Date(item.updatedAt).toLocaleString()}</span>
                <strong>{item.name}</strong>
                <span className="ml-2 text-sm text-gray-500">({item.type})</span>
              </div>
            </li>
          ) : (
            <li key={item.id} className="mb-4">
              <div className="flex items-center">
                <span className="mr-2">{new Date(item.updatedAt).toLocaleString()}</span>
                <strong>{item.name}</strong>
                <span className="ml-2 text-sm text-gray-500">({item.type})</span>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
