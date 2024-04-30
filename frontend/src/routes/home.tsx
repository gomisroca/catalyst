import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/projects";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){
    const [projects, setProjects] = useState<Project[]>();

    async function fetchProjects(){
        const projs: Project[] = await getProjects();
        console.log(projs)
        setProjects(projs)
    }

    useEffect(() => {
        if(!projects){
            fetchProjects()
        }
    }, [projects])
    return(
        <div className="flex flex-col gap-4">
        {projects && projects.map(project => 
            <Link to={project.id}>
                <Card className="p-4">
                    <CardTitle>
                        {project.name}
                    </CardTitle>
                    <CardDescription>
                        {`${new Date(project.updatedAt).toLocaleDateString()}`}
                    </CardDescription>
                    <CardContent className="p-4">
                        {project.description}
                    </CardContent>
                    <CardFooter>
                        Metrics here
                    </CardFooter>
                </Card>
            </Link>
        )}
        </div>
    )
}