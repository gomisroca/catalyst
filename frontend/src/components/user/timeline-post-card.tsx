import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PostCarousel from "../project/post-carousel";
import PostInteractions from "../project/post-interactions";
import { useUser } from "@/contexts/user-provider";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { BsQuestion } from "react-icons/bs";
import { Eye } from "lucide-react";

export default function TimelinePostCard({ post } : { post: Post}){
    const { user } = useUser();
    const [hidePost, setHidePost] = useState(false);
    
    useEffect(() => {
        if(
        user && 
        (post.interactions.filter(int => (int.type == 'REPORT' || int.type == 'HIDE') && 
        int.user.id == user.id).length > 0)){
            setHidePost(true)
        }
    }, [user, post])

    return (
        <Card className="p-4 relative">
            {hidePost &&
            <div className="z-10 flex items-center justify-center absolute w-11/12 h-5/6 rounded-md gap-1">
                <Button size={"lg"} onClick={() => setHidePost(false)}>
                    <Eye />
                    Show Post
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BsQuestion className="w-5 h-5"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            You hid or reported this post.
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>}
            <div className={hidePost ? "blur-md flex gap-2 items-center": "flex gap-2 items-center"}>
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`/images/${post.author.avatar}`} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardDescription className="flex gap-1">
                        <span>in</span>
                        <Link 
                        to={`/${post.branch.projectId}/${post.branch.id}/`}
                        className=" text-gray-500 hover:text-gray-600">
                            {post.branch.name}
                        </Link>
                    </CardDescription>
                    <CardTitle className="text-lg gap-1 flex">
                        {post.author.nickname ?
                        <span>{post.author.nickname}</span>
                        :
                        <span>{post.author.username}</span>}
                        <Link to={`/profile/${post.author.id}`}>
                            <span className="text-gray-500 hover:text-gray-600 cursor-pointer">@{post.author.username}</span>
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {`${new Date(post.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                </div>
            </div>
            <CardContent className={hidePost ? "blur-md py-2 px-0 xl:px-6" : "py-2 px-0 xl:px-6"}>
                {post.content}
            </CardContent>
            {post.media &&
            <CardFooter className={hidePost ? "blur-md gap-2 grid grid-cols-2 lg:grid-cols-5 px-0 pt-2 pb-4" : "gap-2 grid grid-cols-2 lg:grid-cols-5 px-0 pt-2 pb-4"}>
                {post.media.map(media =>
                <Dialog key={media}>
                    <DialogTrigger>
                        <div className="rounded-md w-full lg:w-[130px] xl:w-[200px] 2xl:w-[300px] h-[80px] lg:h-[100px] 2xl:h-[125px] overflow-hidden items-center flex">
                            <img className="rounded-md self-center" src={`/images/${media}`} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="p-1 max-w-none rounded-md w-auto">
                        <PostCarousel carousel={post.media} selected={post.media.findIndex(x => x == media)} />
                    </DialogContent>
                </Dialog>
                )}
            </CardFooter>}
            <div className={hidePost ? "blur-md" : ''}>
                <PostInteractions post={post} branch={post.branch} />
            </div>
        </Card>
    )
}