// Base Imports
import { Link } from 'react-router-dom';
// Hook Imports
import { useEffect, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Improts
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BsQuestion } from 'react-icons/bs';
import { Eye } from 'lucide-react';
// Component Imports
import PostCarousel from '@/components/project/post-carousel';
import PostInteractions from '@/components/project/post-interactions';

export default function TimelinePostCard({ post }: { post: Post }) {
  const { data: user } = useGetSelf();
  const [hidePost, setHidePost] = useState(false);

  useEffect(() => {
    if (
      post.interactions.filter((int) => (int.type == 'REPORT' || int.type == 'HIDE') && int.user.id == user?.id)
        .length > 0
    ) {
      setHidePost(true);
    }
  }, [user, post]);

  return (
    <Card className="relative p-4">
      {hidePost && (
        <div className="absolute z-10 flex h-5/6 w-11/12 items-center justify-center gap-1 rounded-md">
          <Button size={'lg'} onClick={() => setHidePost(false)}>
            <Eye />
            Show Post
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BsQuestion className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>You hid or reported this post.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div className={hidePost ? 'flex items-center gap-2 blur-md' : 'flex items-center gap-2'}>
        <Avatar className="rounded-md">
          <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + post.author.avatar}`} />
          <AvatarFallback>{post.author.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardDescription className="flex gap-1">
            <span>in</span>
            <Link to={`/${post.branch.projectId}/${post.branch.id}/`} className="text-gray-500 hover:text-gray-600">
              {post.branch.name}
            </Link>
          </CardDescription>
          <CardTitle className="flex gap-1 text-lg">
            {post.author.nickname ? <span>{post.author.nickname}</span> : <span>{post.author.username}</span>}
            <Link to={`/profile/${post.author.id}`}>
              <span className="cursor-pointer text-gray-500 hover:text-gray-600">@{post.author.username}</span>
            </Link>
          </CardTitle>
          <CardDescription>{`${new Date(post.updatedAt).toLocaleDateString()}`}</CardDescription>
        </div>
      </div>
      <CardContent className={hidePost ? 'px-0 py-2 blur-md xl:px-6' : 'px-0 py-2 xl:px-6'}>{post.content}</CardContent>
      {post.media && (
        <CardFooter
          className={
            hidePost
              ? 'grid grid-cols-2 gap-2 px-0 pb-4 pt-2 blur-md lg:grid-cols-5'
              : 'grid grid-cols-2 gap-2 px-0 pb-4 pt-2 lg:grid-cols-5'
          }
        >
          {post.media.map((media) => (
            <Dialog key={media}>
              <DialogTrigger>
                <div className="flex h-[80px] w-full items-center overflow-hidden rounded-md lg:h-[100px] lg:w-[130px] xl:w-[200px] 2xl:h-[125px] 2xl:w-[300px]">
                  <img className="self-center rounded-md" src={`${import.meta.env.VITE_IMG_ROOT + media}`} />
                </div>
              </DialogTrigger>
              <DialogContent className="w-auto max-w-none rounded-md p-1">
                <PostCarousel carousel={post.media} selected={post.media.findIndex((x) => x == media)} />
              </DialogContent>
            </Dialog>
          ))}
        </CardFooter>
      )}
      <div className={hidePost ? 'blur-md' : ''}>
        <PostInteractions post={post} branch={post.branch} />
      </div>
    </Card>
  );
}
