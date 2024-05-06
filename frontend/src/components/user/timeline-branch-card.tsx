import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import BranchInteractions from "../project/branch-interactions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { BsActivity, BsFire } from "react-icons/bs";

export default function TimelineBranchCard({ branch } : { branch: Branch}){
    return (
        <Card className="p-4 relative">
            <div className="flex gap-2 items-center">
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
            <CardContent className="p-4">
                {branch.description}
            </CardContent>
            <BranchInteractions branch={branch} />
        </Card>
    )
}