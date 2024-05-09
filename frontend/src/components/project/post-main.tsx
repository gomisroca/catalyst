import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PostCarousel from "./post-carousel";
import PostInteractions from "./post-interactions";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/user-provider";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

export default function PostMain({ post }: { post: Post}){
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
    return(
        <>
        <Card className="p-4 relative">
            {hidePost &&
            <div className="z-10 flex items-center justify-center absolute w-11/12 h-5/6 rounded-md">
                <Button size={"lg"} onClick={() => setHidePost(false)}>
                    <Eye />
                    Show Post
                </Button>
            </div>}
            <div className={hidePost ? "blur-md flex gap-2 items-center" : "flex gap-2 items-center"}>
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${post.author.avatar}`} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
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
            <CardContent className={hidePost ? "blur-md py-2" : "py-2"}>
                {post.content}
            </CardContent>
            {post.media &&
            <CardFooter className={hidePost ? "blur-md gap-2 grid grid-cols-2 lg:grid-cols-5 px-0 pt-2 pb-4" : "gap-2 grid grid-cols-2 lg:grid-cols-5 px-0 pt-2 pb-4"}>
                {post.media.map(media =>
                <Dialog>
                    <DialogTrigger>
                        <div className="rounded-md w-full lg:w-[150px] xl:w-[200px] 2xl:w-[300px] h-[80px] lg:h-[100px] 2xl:h-[125px] overflow-hidden items-center flex">
                            <img className="rounded-md self-center" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${media}`} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="p-1 max-w-none rounded-md w-auto">
                        <PostCarousel carousel={post.media} selected={post.media.findIndex(x => x == media)} />
                    </DialogContent>
                </Dialog>
                )}
            </CardFooter>}
            <div className={hidePost ? 'blur-md' : ''}>
            <PostInteractions post={post} />
            </div>
        </Card>
        </>
    )
}