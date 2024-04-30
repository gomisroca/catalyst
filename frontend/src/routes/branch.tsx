import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getBranch } from "@/lib/projects";
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom";

export default function Branch(){
    const { projectId, branchId } = useParams();
    const [branch, setBranch] = useState<Branch>();

    async function fetchBranch(projectId: string, branchId: string){
        const fetchedBranch: Branch = await getBranch(projectId, branchId);
        console.log(fetchedBranch)
        setBranch(fetchedBranch)
    }

    useEffect(() => {
        if(projectId && branchId){
            fetchBranch(projectId, branchId)
        }
    }, [projectId, branchId])
    
    return(
        <>
        {branch &&
        <Card className="p-4">
            <CardTitle> {branch.name}</CardTitle>
            <CardDescription>{`${new Date(branch.updatedAt).toLocaleDateString()}`}</CardDescription>
            <CardContent className="p-4">
                {branch.description}
                {branch.posts && branch.posts.map(post => 
                    <Card>
                        <CardDescription>{`${new Date(post.updatedAt).toLocaleDateString()}`}</CardDescription>
                        <CardContent>{post.content}</CardContent>
                        {post.media &&
                        <CardFooter>
                            {post.media.map(media =>
                                <img src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${media}`} />
                            )}
                        </CardFooter>}
                    </Card>
                )}
            </CardContent>
            <CardFooter>
                Metrics here
            </CardFooter>
            <Outlet />
        </Card>}
        </>
    )
}