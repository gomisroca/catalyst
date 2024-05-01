import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PostCarousel from "./post-carousel";

export default function PostMain({ post }: { post: Post}){
    return(
        <>
        <Card className="p-4">
            <div className="flex gap-2 items-center">
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${post.author.avatar}`} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>
                        {post.author.nickname ?
                        <span>{post.author.nickname}</span>
                        :
                        <span>{post.author.username}</span>}
                        <span className="text-gray-500">@{post.author.username}</span>
                    </CardTitle>
                    <CardDescription>
                        {`${new Date(post.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                </div>
            </div>
            <CardContent className="py-2">
                {post.content}
            </CardContent>
            {post.media &&
            <CardFooter className="gap-2">
                {post.media.map(media =>
                <Dialog>
                    <DialogTrigger>
                        <div className="rounded-md w-[150px] h-[100px] overflow-hidden items-center flex">
                            <img className="rounded-md self-center" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${media}`} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="p-1 max-w-none w-3/4 rounded-md">
                        <PostCarousel carousel={post.media} selected={post.media.findIndex(x => x == media)} />
                    </DialogContent>
                </Dialog>
                )}
            </CardFooter>}
        </Card>
        </>
    )
}