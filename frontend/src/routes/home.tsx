import PaginationWrapper from "@/components/pagination-wrapper";
import { ProjectCard } from "@/components/project/project-card";
import { useUser } from "@/contexts/user-provider";
import { getProjects } from "@/lib/projects";
import { useEffect, useState } from "react";

export default function Home(){
    const { user } = useUser();
    const [projects, setProjects] = useState<Project[]>();
    const [paginatedProjects, setPaginatedProjects] = useState<Project[]>();
    const [page, setPage] = useState<number>(1);
    const pageCount = 5;



    useEffect(() => {
        async function fetchProjects(){
            const projs: Project[] = await getProjects();
            const filteredProjects = projs.filter(proj =>  proj.permissions.private == false || 
                user && (proj.author.id == user.id || proj.permissions.allowUsers.includes(user.id)) );
            setProjects(filteredProjects);
        }
        fetchProjects();
    }, [user])
    
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        function paginate(projects: Project[]){
            const paginated = projects.slice((page - 1) * pageCount, (page) * pageCount)
            setPaginatedProjects(paginated);
        }

        if(projects){
            paginate(projects)
        }
    }, [projects, page])

    return(
        <div className="flex flex-col gap-4 w-5/6">
            {projects && (projects.length > pageCount) &&
            <PaginationWrapper onPageChange={handlePageChange} page={page} pageCount={pageCount} data={projects} />}
            {paginatedProjects && paginatedProjects.map(project => 
                <ProjectCard project={project} />
            )}
        </div>
    )
}