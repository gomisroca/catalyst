import { Ban, BookmarkMinus, BookmarkPlus, EllipsisVertical, Eye, EyeOff, Forward, Star, StarOff } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useUser } from "@/contexts/user-provider";
import Cookies  from 'js-cookie';
import { removeInteractions, updateInteractions } from "@/lib/projects";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function PostInteractions({ post }: { post: Post }){
    console.log(post)
    const { user } = useUser();
    const accessToken = Cookies.get('__catalyst__jwt');
    const [likes, setLikes] = useState(post.likes || []);
    const [shares, setShares] = useState(post.shares || []);
    const [bookmarks, setBookmarks] = useState(post.bookmarks || []);
    const [reports, setReports] = useState(post.reports || []);
    const [hidden, setHidden] = useState(post.hidden || []);

    async function addInteraction(type: string) {
        if(accessToken){
            const data = {
                type: type
            }
            const res = await updateInteractions(accessToken, post.id, data)
            if(res.ok){
                const postWithInteractions = await res.json();
                setLikes(postWithInteractions.likes);
                setShares(postWithInteractions.shares);
                setBookmarks(postWithInteractions.bookmarks);
                setReports(postWithInteractions.reports);
                setHidden(postWithInteractions.hidden);
            }
        }
    }

    async function removeInteraction(type: string) {
        if(accessToken){
            const data = {
                type: type
            }
            const res = await removeInteractions(accessToken, post.id, data)
            if(res.ok){
                const postWithInteractions = await res.json();
                setLikes(postWithInteractions.likes);
                setShares(postWithInteractions.shares);
                setBookmarks(postWithInteractions.bookmarks);
                setReports(postWithInteractions.reports);
                setHidden(postWithInteractions.hidden);
            }
        }
    }

    return(
        <div className="flex gap-2 items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {user && likes.filter(x => x.userId == user.id).length > 0 ?
                        <Button onClick={() => removeInteraction('like')} variant={"outline"} className="bg-secondary gap-1">
                            <StarOff />
                            {likes.length > 0 ? likes.length : 0}
                        </Button>
                        :
                        <Button onClick={() => addInteraction('like')} variant={"outline"} className="gap-1">
                            <Star />
                            {likes.length > 0 ? likes.length : 0}
                        </Button>}
                    </TooltipTrigger>
                    <TooltipContent>
                        Like
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {user && shares.filter(x => x.userId == user.id).length > 0 ?
                        <Button onClick={() => addInteraction('share')} variant={"outline"} className="bg-secondary gap-1">
                            <Forward />
                            {shares.length > 0 ? shares.length : 0}
                        </Button>
                        :
                        <Button onClick={() => addInteraction('share')} variant={"outline"} className="gap-1">
                            <Forward />
                            {shares.length > 0 ? shares.length : 0}
                        </Button>}
                    </TooltipTrigger>
                    <TooltipContent>
                        Share
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {user && bookmarks.filter(x => x.userId == user.id).length > 0 ?
                        <Button onClick={() => removeInteraction('bookmark')} variant={"outline"} className="bg-secondary">
                            <BookmarkMinus />
                        </Button>
                        :
                        <Button onClick={() => addInteraction('bookmark')} variant={"outline"}>
                            <BookmarkPlus />
                        </Button>}
                    </TooltipTrigger>
                    <TooltipContent>
                        Bookmark
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="gap-1 flex flex-col">
                    {user && reports.filter(x => x.userId == user.id).length > 0 ? 
                    <DropdownMenuItem className="bg-secondary gap-1">
                        <Ban />
                        Report
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem className="gap-1" onClick={() => addInteraction('report')}>
                        <Ban />
                        Report
                    </DropdownMenuItem>}
                    {user && hidden.filter(x => x.userId == user.id).length > 0 ?
                    <DropdownMenuItem className="bg-secondary gap-1" onClick={() => removeInteraction('hidden')}>
                        <Eye />
                        Show
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem className="gap-1" onClick={() => addInteraction('hidden')}>
                        <EyeOff />
                        Hide
                    </DropdownMenuItem>}
                </DropdownMenuContent>
            </DropdownMenu>
            {/* 
            Add ... button with menu to report and hide
            Report and hidden button should open a Alert Dialog to confirm, with a checkbox to either hide or report inside of the other
                So click Report > Are you sure? (checkbox to hide) Confirm/Cancel */}
        </div>
    )
}