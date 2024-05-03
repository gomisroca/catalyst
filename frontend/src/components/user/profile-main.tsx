import { useUser } from "@/contexts/user-provider";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "@/lib/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineBranches } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import ProfileTimeline from "./profile-timeline";

export default function Profile(){
    const { user } = useUser()

    const { userId } = useParams();
    const [profile, setProfile] = useState<User>();

    async function fetchUser(userId: string){
        const prof: User = await getUser(userId);
        console.log(prof)
        setProfile(prof)
    }

    useEffect(() => {
        if(userId){
            fetchUser(userId)
        }
    }, [userId])


    return (
        <>
            {profile &&
            <Card className="p-4 w-5/6">
                <div className="flex gap-2 items-center">
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${profile.avatar}`} />
                    <AvatarFallback>{profile.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg gap-1 flex items-center">
                        {profile.nickname ?
                        <span>{profile.nickname}</span>
                        :
                        <span>{profile.username}</span>}
                        <span className="text-gray-500">@{profile.username}</span>
                        {user?.id == userId && <span className="text-sm">This is you!</span>}
                    </CardTitle>
                    <CardDescription className="flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="outline" className="flex gap-1 items-center" size="sm" >
                                        <FiFolderPlus /> {profile.projects.length}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    See Projects
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="outline" className="flex gap-1 items-center" size="sm">
                                        <AiOutlineBranches /> {profile.branches.length}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    See Branches
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="outline" className="flex gap-1 items-center" size="sm">
                                        <FaRegFileAlt /> {profile.posts.length}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    See Posts
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardDescription>
                </div>
            </div>
            <CardContent className="p-4">
                {/* <ProfileTimeline profile={profile} />
                OUTLET
                Here the timeline of last activity '/'
                it switches to see the projects, branches, posts when clicked '/projects' '/branches' '/posts'
                it switches to see the people they follow/who follow them when clicked '/follows' '/followers' */}
            </CardContent>
            </Card>}
        </>
    )
}