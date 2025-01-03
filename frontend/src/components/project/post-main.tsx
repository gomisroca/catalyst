import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import PostCarousel from './post-carousel';
import PostInteractions from './post-interactions';
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/user-provider';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Eye, Pencil } from 'lucide-react';
import { BsQuestion } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { PostEditForm } from './post-edit-form';

export default function PostMain({ post, branch }: { post: Post; branch: Branch }) {
  const [open, setOpen] = useState(false);
  const handleSubmitSuccess = () => {
    setOpen(false);
  };

  const { user } = useUser();
  const [hidePost, setHidePost] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (
      user &&
      post.interactions.filter((int) => (int.type == 'REPORT' || int.type == 'HIDE') && int.user.id == user.id).length >
        0
    ) {
      setHidePost('You hid or reported this post.');
    } else if (post.interactions.filter((int) => int.type == 'REPORT').length >= 10) {
      setHidePost('This post has been flagged by the community.');
    }
  }, [user, post]);

  return (
    <>
      <Card className="relative p-4">
        {hidePost && (
          <div className="absolute z-10 flex h-5/6 w-11/12 items-center justify-center gap-1 rounded-md">
            <Button size={'lg'} onClick={() => setHidePost(undefined)}>
              <Eye />
              Show Post
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BsQuestion className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent>{hidePost}</TooltipContent>
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
            <CardTitle className="flex items-center gap-1 text-lg">
              {post.author.nickname ? <span>{post.author.nickname}</span> : <span>{post.author.username}</span>}
              <Link to={`/profile/${post.author.id}`}>
                <span className="cursor-pointer text-gray-500 hover:text-gray-600">@{post.author.username}</span>
              </Link>
              {user && user.id == post.author.id && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Edit Project</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="w-5/6 rounded-md">
                    <PostEditForm onSubmitSuccess={handleSubmitSuccess} post={post} />
                  </DialogContent>
                </Dialog>
              )}
            </CardTitle>
            <CardDescription className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {`${new Date(post.createdAt).toLocaleDateString()}`}
                  </TooltipTrigger>
                  <TooltipContent>Created</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              •
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {`${new Date(post.updatedAt).toLocaleDateString()}`}
                  </TooltipTrigger>
                  <TooltipContent>Updated</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardDescription>
          </div>
        </div>
        <CardContent className={hidePost ? 'py-2 blur-md' : 'py-2'}>{post.content}</CardContent>
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
                  <div className="flex h-[80px] w-full items-center overflow-hidden rounded-md lg:h-[100px] lg:w-[150px] xl:w-[200px] 2xl:h-[125px] 2xl:w-[300px]">
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
          <PostInteractions post={post} branch={branch} />
        </div>
      </Card>
    </>
  );
}
