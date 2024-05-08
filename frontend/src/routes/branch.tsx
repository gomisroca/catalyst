import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getBranch } from "@/lib/projects";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/contexts/user-provider";
import CreatePostButton from "@/components/project/create-post-button";
import PostMain from "@/components/project/post-main";
import BranchInteractions from "@/components/project/branch-interactions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BsActivity, BsFire } from "react-icons/bs";
import PaginationWrapper from "@/components/pagination-wrapper";

export default function Branch(){
    const { user } = useUser();
    const { projectId, branchId } = useParams();
    const [branch, setBranch] = useState<Branch>();
    const [paginatedPosts, setPaginatedPosts] = useState<Post[]>();
    const [page, setPage] = useState<number>(1);
    const pageCount = 5;

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    async function fetchBranch(branchId: string){
        const fetchedBranch: Branch = await getBranch(branchId);
        console.log(fetchedBranch)
        setBranch(fetchedBranch)
    }

    useEffect(() => {
        if(projectId && branchId){
            fetchBranch(branchId)
        }
    }, [projectId, branchId])
    
    useEffect(() => {
        function paginate(posts: Post[]){
            const paginated = posts.slice((page - 1) * pageCount, (page) * pageCount)
            setPaginatedPosts(paginated);
        }

        if(branch && branch.posts){
            paginate(branch.posts)
        }
    }, [branch, page])


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
            <CardDescription className="px-4">
                {branch.author && (branch.author.nickname || branch.author.username)}
                <Link to={`/profile/${branch.author.id}`} className="hover:text-gray-500">
                    @{branch.author.username}
                </Link>
            </CardDescription>
            <CardTitle className="flex items-center px-4 gap-2">
                {branch.name}
                {branch.trendingActivity && 
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BsActivity className="text-green-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            Active
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
                {branch.trendingPopularity && 
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BsFire className="text-orange-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            Popular
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
            </CardTitle>
            <CardDescription className="px-4">
                {`${new Date(branch.updatedAt).toLocaleDateString()}`}
            </CardDescription>
            <div className="md:absolute md:right-4 top-4 flex gap-2 items-start md:items-end flex-col">
                <BranchInteractions branch={branch} />
                <div className="hidden md:flex flex-col">
                    {branch.parentBranch && 
                    <Link className="text-gray-500 flex gap-1 items-center justify-end hover:text-gray-600" to={`/${projectId}/${branch.parentBranch.id}`}>
                        {branch.parentBranch.name}
                        <MdKeyboardArrowRight className="mt-1"/>
                    </Link>}
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
            </div>
            <CardContent className="p-4">
                {branch.description}
                <div className="flex flex-col gap-1 mt-8">
                    <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-0">
                        {user && (branch.author.id == user.id || branch.permissions.allowCollaborate) &&
                        <CreatePostButton branch={branch} />}

                        {branch.posts && (branch.posts.length > pageCount) &&
                        <div className="lg:absolute right-0 left-0">
                        <PaginationWrapper onPageChange={handlePageChange} page={page}  pageCount={pageCount} data={branch.posts} />
                        </div>}
                    </div>
                {paginatedPosts && paginatedPosts.map(post => 
                    <PostMain post={post} />
                )}
                </div>
            </CardContent>
            <Outlet />
        </Card>}
        </>
    )
}