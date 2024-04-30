import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom";
// import { BsFire, BsActivity } from 'react-icons/bs';


export default function Project(){
    const { projectId } = useParams();
    const [project, setProject] = useState<Project>();

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
            <CardTitle className="flex gap-8 items-center">
                {project.name}
                {/* <BsActivity />  if project is in top % of recent activity (posts, branches in last 7 days) */}
                {/* <BsFire />  if project is in top % of recent popularity (positive interactions minus negative interactions in last 7 days) */}
            </CardTitle>
            <CardDescription>
                {`${new Date(project.updatedAt).toLocaleDateString()}`}
            </CardDescription>
            <CardContent className="p-4">
                {project.description}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <span className="text-lg">Branches</span>
                <div className="flex gap-2">
                {project.branches && project.branches.map(branch =>
                    <Link to={branch.id}>
                        <Button variant="outline">
                            {branch.name}
                        </Button>
                    </Link>
                )}
                </div>
            </CardFooter>
        </Card>}
        <Outlet />
        </div>
    )
}