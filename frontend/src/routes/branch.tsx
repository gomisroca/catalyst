// Base Imports
import { Outlet, useNavigate, useParams } from 'react-router-dom';
// Hook Imports
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useGetBranch } from '@/hooks/branches/useGetBranch';
// UI Imports
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
import { FiPlus } from 'react-icons/fi';
// Component Imports
import BranchInteractions from '@/components/branch/branch-interactions';
import BranchDetails from '@/components/branch/branch-details';
import PostCard from '@/components/post/post-card';

// Utility Functions
const hasNoNegativeInteraction = (post: Post, user?: BasicUser) =>
  !user ||
  !post.interactions.some(
    (interaction) => ['REPORT', 'HIDE'].includes(interaction.type) && interaction.user.id === user?.id
  );

const filterAndSortPosts = (posts: Post[], user?: BasicUser) => {
  if (!posts) return [];
  return posts.filter((post) => hasNoNegativeInteraction(post, user));
};

// Post Creation Dialog
function CreatePostButton({ branch }: { branch: Branch }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="mb-2 flex w-full items-center"
      onClick={() => navigate(`/projects/${branch.project.id}/${branch.id}/new`)}
    >
      <FiPlus className="mr-2 h-4 w-4" /> Add Post
    </Button>
  );
}

export default function Branch() {
  const { data: user } = useGetSelf();
  const { branchId } = useParams();

  const { data: branch, isLoading, error } = useGetBranch(branchId!);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!branch) return <Error message="Branch not found" />;

  const posts = filterAndSortPosts(branch.posts, user);
  return (
    <div className="flex w-full flex-col gap-2">
      <Card className="w-full p-4">
        <BranchDetails branch={branch} user={user} />
        <div className="top-4 flex flex-col items-start gap-2 md:absolute md:right-4 md:items-end">
          <BranchInteractions branch={branch} />
        </div>
        <CardContent className="px-0 py-4 md:px-4">
          <span>{branch.description}</span>
          <div className="mt-8 flex flex-col gap-1">
            {user &&
              (branch.author.id === user?.id ||
                (branch.permissions.allowCollaborate && branch.project.permissions.allowCollaborate)) && (
                <CreatePostButton branch={branch} />
              )}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  );
}
