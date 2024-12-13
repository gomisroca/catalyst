import { Ban, BookmarkMinus, BookmarkPlus, EllipsisVertical, Eye, EyeOff, Forward, Star, StarOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useUser } from '@/contexts/user-provider';
import { removePostInteractions, updatePostInteractions } from '@/lib/projects';
import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { getCookie } from '@/lib/cookies';

export default function PostInteractions({ post, branch }: { post: Post; branch: Branch }) {
  const { user } = useUser();
  const accessToken = getCookie('__catalyst__jwt');
  const [likes, setLikes] = useState(post.interactions.filter((int) => int.type == 'LIKE') || []);
  const [shares, setShares] = useState(post.interactions.filter((int) => int.type == 'SHARE') || []);
  const [bookmarks, setBookmarks] = useState(post.interactions.filter((int) => int.type == 'BOOKMARK') || []);
  const [reports, setReports] = useState(post.interactions.filter((int) => int.type == 'REPORT') || []);
  const [hidden, setHidden] = useState(post.interactions.filter((int) => int.type == 'HIDE') || []);

  useEffect(() => {
    setLikes(post.interactions.filter((int) => int.type == 'LIKE'));
    setShares(post.interactions.filter((int) => int.type == 'SHARE'));
    setBookmarks(post.interactions.filter((int) => int.type == 'BOOKMARK'));
    setReports(post.interactions.filter((int) => int.type == 'REPORT'));
    setHidden(post.interactions.filter((int) => int.type == 'HIDE'));
  }, [post]);

  async function addInteraction(type: string) {
    if (accessToken) {
      const data = {
        type: type,
      };
      const res = await updatePostInteractions(accessToken, post.id, data);
      if (res.ok) {
        const postWithInteractions = await res.json();
        setLikes(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'LIKE'));
        setShares(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'SHARE'));
        setBookmarks(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'BOOKMARK'));
        setReports(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'REPORT'));
        setHidden(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'HIDE'));
      }
    }
  }

  async function removeInteraction(type: string) {
    if (accessToken) {
      const data = {
        type: type,
      };
      const res = await removePostInteractions(accessToken, post.id, data);
      if (res.ok) {
        const postWithInteractions = await res.json();
        setLikes(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'LIKE'));
        setShares(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'SHARE'));
        setBookmarks(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'BOOKMARK'));
        setReports(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'REPORT'));
        setHidden(postWithInteractions.interactions.filter((int: Interaction) => int.type == 'HIDE'));
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {user && likes.filter((x) => x.userId == user.id).length > 0 ? (
              <Button onClick={() => removeInteraction('like')} variant={'outline'} className="gap-1 bg-secondary">
                <StarOff />
                {likes.length > 0 ? likes.length : 0}
              </Button>
            ) : (
              <Button onClick={() => addInteraction('like')} variant={'outline'} className="gap-1">
                <Star />
                {likes.length > 0 ? likes.length : 0}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>Like</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {branch.permissions.allowShare && branch.project.permissions.allowShare && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {user && shares.filter((x) => x.userId == user.id).length > 0 ? (
                <Button variant={'outline'} disabled className="gap-1 bg-secondary">
                  <Forward />
                  {shares.length > 0 ? shares.length : 0}
                </Button>
              ) : (
                <Button onClick={() => addInteraction('share')} variant={'outline'} className="gap-1">
                  <Forward />
                  {shares.length > 0 ? shares.length : 0}
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {user && bookmarks.filter((x) => x.userId == user.id).length > 0 ? (
              <Button onClick={() => removeInteraction('bookmark')} variant={'outline'} className="bg-secondary">
                <BookmarkMinus />
              </Button>
            ) : (
              <Button onClick={() => addInteraction('bookmark')} variant={'outline'}>
                <BookmarkPlus />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>Bookmark</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          {/* Make report open a modal with a form with general reasons select and textarea, on submit, also add the interaction 
                    if the user has already reported, fade out the icon and it does nothing*/}
          {user && reports.filter((x) => x.userId == user.id).length > 0 ? (
            <DropdownMenuItem className="gap-1 bg-secondary" disabled>
              <Ban />
              Report
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer gap-1" onClick={() => addInteraction('report')}>
              <Ban />
              Report
            </DropdownMenuItem>
          )}
          {user && hidden.filter((x) => x.userId == user.id).length > 0 ? (
            <DropdownMenuItem className="cursor-pointer gap-1 bg-secondary" onClick={() => removeInteraction('hidden')}>
              <Eye />
              Show
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer gap-1" onClick={() => addInteraction('hidden')}>
              <EyeOff />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
