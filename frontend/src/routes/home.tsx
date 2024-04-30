import { ProjectCard } from "@/components/project/project-card";
import { useUser } from "@/contexts/user-provider";
import { getProjects } from "@/lib/projects";
import { useEffect, useState } from "react";

export default function Home(){
    const [projects, setProjects] = useState<Project[]>();
    const { user } = useUser();

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
            project.permissions.private ?
                user && (project.author.id == user.id) &&
                    <ProjectCard project={project} />
            :
            <ProjectCard project={project} />
        )}
        </div>
    )
}