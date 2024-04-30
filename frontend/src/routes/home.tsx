import { ProjectCard } from "@/components/project/project-card";
import { getProjects } from "@/lib/projects";
import { useEffect, useState } from "react";

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
            <ProjectCard project={project} />
        )}
        </div>
    )
}