import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getBranch } from "@/lib/projects";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/contexts/user-provider";
import CreatePostButton from "@/components/project/create-post-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Branch(){
    const { user } = useUser();
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
    
    const navigate = useNavigate();
    const [selectedBranch, setSelectedBranch] = useState<string>();
    useEffect(() => {
        if(selectedBranch && selectedBranch !== 'null'){
            navigate(`/${projectId}/${selectedBranch}`)
            setSelectedBranch('null')
        }
    }, [selectedBranch, projectId, navigate])
    
    return(
        <>
        {branch &&
        <Card className="p-4 relative">
            <CardTitle className="flex items-center ">
                {branch.name}
            </CardTitle>
            <CardDescription>{`${new Date(branch.updatedAt).toLocaleDateString()}`}</CardDescription>
            <div className="absolute right-4 top-4">
                {branch.parentBranch && 
                <div className="text-gray-500 flex gap-1 items-center justify-end">
                    {branch.parentBranch.name}
                    <MdKeyboardArrowRight className="mt-1"/>
                </div>}
                <div className="flex gap-1 items-center justify-end">
                    {branch.name}
                    {branch.childBranches.length > 0 && <MdKeyboardArrowRight className="mt-1"/>}
                </div>
                {branch.childBranches && branch.childBranches.length > 0 &&
                <div>
                    <Select onValueChange={e => setSelectedBranch(e)} defaultValue={'null'}>
                        <SelectTrigger>
                            <SelectValue placeholder="Child Branches" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'null'}>--</SelectItem>
                            {branch.childBranches.map(branch =>
                            branch.permissions.private ?
                                user && (branch.author.id == user.id) &&
                                <SelectItem value={branch.id}>{branch.name}</SelectItem>
                            :
                            <SelectItem value={branch.id}>{branch.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>}
            </div>
            <CardContent className="p-4">
                {branch.description}
                <div className="flex flex-col gap-1 mt-8">
                {branch.permissions.allowCollaborate &&
                <CreatePostButton branch={branch} />}
                {branch.posts && branch.posts.map(post => 
                    <Card className="p-4">
                        <div className="flex gap-2 items-center">
                            <Avatar className="rounded-md">
                                <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${post.author.avatar}`} />
                                <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>
                                    {post.author.nickname ?
                                    <span>{post.author.nickname}</span>
                                    :
                                    <span>{post.author.username}</span>}
                                    <span className="text-gray-500">@{post.author.username}</span>
                                </CardTitle>
                                <CardDescription>
                                    {`${new Date(post.updatedAt).toLocaleDateString()}`}
                                </CardDescription>
                            </div>
                        </div>
                        <CardContent className="py-2">
                            {post.content}
                        </CardContent>
                        {post.media &&
                        <CardFooter className="gap-2">
                            {post.media.map(media =>
                            <div className="rounded-md w-[150px] h-[100px] overflow-hidden items-center flex">
                                <img className="rounded-md self-center" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${media}`} />
                            </div>
                            )}
                        </CardFooter>}
                    </Card>
                )}
                </div>
            </CardContent>
            <CardFooter>
                Metrics here
            </CardFooter>
            <Outlet />
        </Card>}
        </>
    )
}