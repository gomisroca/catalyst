import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom";
import { useUser } from "@/contexts/user-provider";
import CreateBranchButton from "@/components/project/create-branch-button";
// import { BsFire, BsActivity } from 'react-icons/bs';

export default function Project(){
    const { projectId } = useParams();
    const [project, setProject] = useState<Project>();
    const { user } = useUser();
    
    async function fetchProject(projectId: string){
        const proj: Project = await getProject(projectId);
        console.log(proj)
        setProject(proj)
    }

    useEffect(() => {
        if(projectId){
            fetchProject(projectId)
        }
    }, [projectId])
    
    return( 
        <div className="flex flex-col gap-2 w-full">
        {project &&
         <Card className="p-4 w-full">
            <div className="flex gap-2 items-center">
                <Avatar className="rounded-md">
                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${project.avatar}`} />
                    <AvatarFallback>{project.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>
                        {project.name}
                        {/* <BsActivity />  if project is in top % of recent activity (posts, branches in last 7 days) */}
                        {/* <BsFire />  if project is in top % of recent popularity (positive interactions minus negative interactions in last 7 days) */}
                        
                        {/* On the top right, buttons to share, bookmark */}
                    </CardTitle>
                    <CardDescription>
                        {`${new Date(project.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                </div>
            </div>
            <CardContent className="p-4">
                {project.description}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <span className="text-lg">Branches</span>
                <div className="flex gap-2">
                {project.branches && project.branches.map(branch =>
                    branch.permissions.private ?
                        user && (branch.author.id == user.id) &&
                        <Link to={branch.id}>
                            <Button variant="outline">
                                {branch.name}
                            </Button>
                        </Link>
                    :
                    <Link to={branch.id}>
                        <Button variant="outline">
                            {branch.name}
                        </Button>
                    </Link>
                )}
                {project.permissions.allowBranch &&
                <CreateBranchButton project={project} />}
                </div>
            </CardFooter>
        </Card>}
        <Outlet />
        </div>
    )
}