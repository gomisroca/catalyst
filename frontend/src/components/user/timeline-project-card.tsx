import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { BsActivity, BsFire } from "react-icons/bs";

export default function TimelineProjectCard({ project } : { project: Project}){
    return (
        <Card className="p-4 relative">
            <div className="flex gap-2 items-center">
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`/images/${project.avatar}`} />
                    <AvatarFallback>{project.author.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardDescription className="gap-1 flex">
                        <span>by</span>
                        <Link to={`/profile/${project.author.id}`}>
                            {project.author.nickname ?
                            <span className="ml-[1px] text-gray-500 hover:text-gray-600 cursor-pointer">
                                {project.author.nickname}
                            </span>
                            :
                            <span className="ml-[1px] text-gray-500 hover:text-gray-600 cursor-pointer">
                                {project.author.username}
                            </span>}
                        </Link>
                    </CardDescription>
                    <CardTitle className="flex gap-2">
                        <Link to={`/${project.id}/`}>
                            {project.name} 
                        </Link>
                        {project.trendingActivity && 
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
                        {project.trendingPopularity && 
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
                        {`${new Date(project.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                </div>
            </div>
            <CardContent className="p-4">
                {project.description}
            </CardContent>
        </Card>
    )
}