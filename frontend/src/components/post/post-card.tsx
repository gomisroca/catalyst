// Base Imports
import { twMerge } from 'tailwind-merge';
// Hook Imports
import { useMemo, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BsQuestion } from 'react-icons/bs';
import { Eye } from 'lucide-react';
// Component Imports
import PostInteractions from '@/components/post/post-interactions';
import PostDetails from '@/components/post/post-details';
import PostGallery from '@/components/post/post-gallery';

function HiddenPostScreen({
  post,
  hidePost,
  setHidePost,
}: {
  post: Post;
  hidePost: boolean;
  setHidePost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!hidePost) return null;
  return (
    <div className="absolute z-10 flex h-5/6 w-11/12 items-center justify-center gap-1 rounded-md">
      <Button size={'lg'} onClick={() => setHidePost(false)}>
        <Eye aria-label="Show hidden post" />
        Show post
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BsQuestion aria-label="Why is this post hidden?" className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            {post.interactions.some((i) => i.type === 'REPORT') ? 'You reported this post.' : 'You hid this post.'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default function PostCard({ post }: { post: Post }) {
  const { data: user } = useGetSelf();

  const isPostHidden = useMemo(
    () =>
      post.interactions.some(
        (interaction) => ['REPORT', 'HIDE'].includes(interaction.type) && interaction.user.id === user?.id
      ),
    [post.interactions, user?.id]
  );
  const [hidePost, setHidePost] = useState(isPostHidden);

  return (
    <Card className="relative p-4">
      <HiddenPostScreen post={post} hidePost={hidePost} setHidePost={setHidePost} />
      <div className={twMerge('flex items-center gap-2', hidePost && 'blur-md')}>
        <PostDetails post={post} user={user} />
        <PostInteractions post={post} branch={post.branch} />
      </div>
      <div className={twMerge('flex flex-col items-center justify-center gap-2', hidePost && 'blur-md')}>
        <CardContent className="px-0 py-2 xl:px-6">{post.content}</CardContent>
        <PostGallery post={post} />
      </div>
    </Card>
  );
}
