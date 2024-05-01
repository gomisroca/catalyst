import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/contexts/user-provider";
import CreateBranchButton from "@/components/project/create-branch-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { BsFire, BsActivity } from 'react-icons/bs';

export default function Project(){
    const { user } = useUser();

    const { projectId } = useParams();
    const [project, setProject] = useState<Project>();

    async function fetchProject(projectId: string){
        const proj: Project = await getProject(projectId);
        setProject(proj)
    }

    useEffect(() => {
        if(projectId){
            fetchProject(projectId)
        }
    }, [projectId])

    const navigate = useNavigate();
    const [selectedBranch, setSelectedBranch] = useState<string>();
    useEffect(() => {
        if(selectedBranch && selectedBranch !== 'null'){
            navigate(selectedBranch)
            setSelectedBranch('null')
        }
    }, [selectedBranch, navigate])
    
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
                        
                        {/* On the top right, buttons to share, bookmark if allowed */}
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
                <Select onValueChange={e => setSelectedBranch(e)} value={selectedBranch}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="hidden" value={'null'}>--</SelectItem>
                        {project.branches && project.branches.map(branch =>
                        branch.permissions.private ?
                            user && (branch.author.id == user.id) &&
                            <SelectItem value={branch.id}>{branch.name}</SelectItem>
                        :
                        <SelectItem value={branch.id}>{branch.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                {user && (project.author.id == user.id || project.permissions.allowBranch) &&
                <CreateBranchButton project={project} />}
            </CardFooter>
        </Card>}
        <Outlet />
        </div>
    )
}