import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import BranchInteractions from "../project/branch-interactions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { BsActivity, BsFire, BsQuestion } from "react-icons/bs";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/user-provider";

export default function TimelineBranchCard({ branch } : { branch: Branch}){
    const { user } = useUser();
    const [hideBranch, setHideBranch] = useState(false);

    useEffect(() => {
        if(
        user && 
        (branch.interactions.filter(int => (int.type == 'REPORT' || int.type == 'HIDE') && 
        int.user.id == user.id).length > 0)){
            setHideBranch(true)
        }
    }, [user, branch])

    return (
        <Card className="p-4 relative">
            {hideBranch &&
            <div className="z-10 flex items-center justify-center absolute w-11/12 h-5/6 rounded-md gap-1">
                <Button size={"lg"} onClick={() => setHideBranch(false)}>
                    <Eye />
                    Show Branch
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BsQuestion className="w-5 h-5"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            You hid or reported this branch.
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>}
            <div className={hideBranch ? "blur-md flex gap-2 items-center" : "flex gap-2 items-center"}>
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${branch.project.avatar}`} />
                    <AvatarFallback>{branch.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardDescription className="gap-1 flex">
                        <span>by</span>
                        <Link to={`/profile/${branch.author.id}`}>
                            {branch.author.nickname ?
                            <span className="ml-[1px] text-gray-500 hover:text-gray-600 cursor-pointer">
                                {branch.author.nickname}
                            </span>
                            :
                            <span className="ml-[1px] text-gray-500 hover:text-gray-600 cursor-pointer">
                                {branch.author.username}
                            </span>}
                        </Link>
                        <span>in</span>
                        <Link 
                        to={`/${branch.project.id}/`}
                        className=" text-gray-500 hover:text-gray-600">
                            {branch.project.name}
                        </Link>
                    </CardDescription>
                    <CardTitle className="flex gap-2">
                        <Link to={`/${branch.project.id}/${branch.id}/`}>
                            {branch.name} 
                        </Link>
                        {branch.trendingActivity && 
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BsActivity className="text-green-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Active
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>}
                        {branch.trendingPopularity && 
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BsFire className="text-orange-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Popular
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>}
                    </CardTitle>
                    <CardDescription>
                        {`${new Date(branch.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                </div>
            </div>
            <CardContent className={hideBranch ? "blur-md p-4" : "p-4"}>
                {branch.description}
            </CardContent>
            <div className={hideBranch ? "blur-md": ''}>
                <BranchInteractions branch={branch} />
            </div>
        </Card>
    )
}