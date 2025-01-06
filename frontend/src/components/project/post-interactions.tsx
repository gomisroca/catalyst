// Hook Imports
import { useEffect, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { removePostInteractions, updatePostInteractions } from '@/lib/projects';
// UI Imports
import { Button } from '@/components/ui/button';
import { Ban, BookmarkMinus, BookmarkPlus, EllipsisVertical, Eye, EyeOff, Forward, Star, StarOff } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PostInteractions({ post, branch }: { post: Post; branch: Branch }) {
  const { data: user } = useGetSelf();

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

  async function removeInteraction(type: string) {
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

  return (
    <div className="flex items-center gap-2">
      {likes.filter((x) => x.userId === user?.id).length > 0 ? (
        <Button onClick={() => removeInteraction('like')} variant={'outline'} className="gap-1 bg-secondary">
          <StarOff />
          {likes.length > 0 ? likes.length : 0}
        </Button>
      ) : user ? (
        <Button onClick={() => addInteraction('like')} variant={'outline'} className="gap-1">
          <Star />
          {likes.length > 0 ? likes.length : 0}
        </Button>
      ) : (
        <Button variant={'outline'} className="gap-1" disabled>
          <Star />
          {likes.length > 0 ? likes.length : 0}
        </Button>
      )}
      {branch.permissions.allowShare && branch.project.permissions.allowShare && (
        <>
          {shares.filter((x) => x.userId === user?.id).length > 0 ? (
            <Button variant={'outline'} disabled className="gap-1 bg-secondary">
              <Forward />
              {shares.length > 0 ? shares.length : 0}
            </Button>
          ) : user ? (
            <Button onClick={() => addInteraction('share')} variant={'outline'} className="gap-1">
              <Forward />
              {shares.length > 0 ? shares.length : 0}
            </Button>
          ) : (
            <Button variant={'outline'} className="gap-1" disabled>
              <Forward />
              {shares.length > 0 ? shares.length : 0}
            </Button>
          )}
        </>
      )}
      {bookmarks.filter((x) => x.userId == user?.id).length > 0 ? (
        <Button onClick={() => removeInteraction('bookmark')} variant={'outline'} className="bg-secondary">
          <BookmarkMinus />
        </Button>
      ) : user ? (
        <Button onClick={() => addInteraction('bookmark')} variant={'outline'}>
          <BookmarkPlus />
        </Button>
      ) : (
        <Button variant={'outline'} disabled>
          <BookmarkPlus />
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          {/* Make report open a modal with a form with general reasons select and textarea, on submit, also add the interaction 
                    if the user has already reported, fade out the icon and it does nothing*/}
          {reports.filter((x) => x.userId == user?.id).length > 0 ? (
            <DropdownMenuItem className="gap-1 bg-secondary" disabled>
              <Ban />
              Report
            </DropdownMenuItem>
          ) : user ? (
            <DropdownMenuItem className="cursor-pointer gap-1" onClick={() => addInteraction('report')}>
              <Ban />
              Report
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="gap-1 bg-secondary" disabled>
              <Ban />
              Report
            </DropdownMenuItem>
          )}
          {hidden.filter((x) => x.userId == user?.id).length > 0 ? (
            <DropdownMenuItem className="cursor-pointer gap-1 bg-secondary" onClick={() => removeInteraction('hidden')}>
              <Eye />
              Show
            </DropdownMenuItem>
          ) : user ? (
            <DropdownMenuItem className="cursor-pointer gap-1" onClick={() => addInteraction('hidden')}>
              <EyeOff />
              Hide
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer gap-1" disabled>
              <EyeOff />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
