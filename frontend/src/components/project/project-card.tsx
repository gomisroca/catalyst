import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProjectCard({ project }: { project: Project }) {
    return (
    <>
        <Link to={project.id}>
            <Card className="p-4">
                <div className="flex gap-2 items-center">
                    <Avatar className="rounded-md">
                        <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${project.avatar}`} />
                        <AvatarFallback>{project.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>
                            {project.name}
                        </CardTitle>
                        <CardDescription>
                            {`${new Date(project.updatedAt).toLocaleDateString()}`}
                        </CardDescription>
                    </div>
                </div>
                <CardContent className="p-4">
                    {project.description}
                </CardContent>
                <CardFooter>
                    Metrics here
                </CardFooter>
            </Card>
        </Link>
    </>
    )
}