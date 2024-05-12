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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { BranchEditForm } from "@/components/project/branch-edit-form";

export default function Branch(){
    const [open, setOpen] = useState(false);

    const handleSubmitSuccess = () => {
        setOpen(false)
    }
    
    const { user } = useUser();
    const { projectId, branchId } = useParams();
    const [branch, setBranch] = useState<Branch>();
    const [posts, setPosts] = useState<Post[]>();
    const [paginatedPosts, setPaginatedPosts] = useState<Post[]>();
    const [page, setPage] = useState<number>(1);
    const pageCount = 5;

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    useEffect(() => {
        async function fetchBranch(branchId: string){
            const fetchedBranch: Branch = await getBranch(branchId);
            setBranch(fetchedBranch)
            console.log(fetchedBranch)
            const sortedPosts = fetchedBranch.posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            setPosts(sortedPosts);
        }

        if(projectId && branchId){
            fetchBranch(branchId)
        }
    }, [user, projectId, branchId])
    
    useEffect(() => {
        function paginate(posts: Post[]){
            const paginated = posts.slice((page - 1) * pageCount, (page) * pageCount)
            setPaginatedPosts(paginated);
        }

        if(branch && posts){
            paginate(posts)
        }
    }, [branch, posts, page])


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
            <CardDescription className="md:px-4">
                {branch.author && (branch.author.nickname || branch.author.username)}
                <Link to={`/profile/${branch.author.id}`} className="hover:text-gray-500">
                    @{branch.author.username}
                </Link>
            </CardDescription>
            <CardTitle className="flex items-center gap-2 md:px-4">
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
                {user && user.id == branch.author.id &&
                <Dialog open={open} onOpenChange={setOpen}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-16">
                                <DialogTrigger asChild>
                                    <Button variant='outline'>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                Edit Project
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="w-5/6 rounded-md">
                        <BranchEditForm onSubmitSuccess={handleSubmitSuccess} branch={branch} />
                    </DialogContent>
                </Dialog>}
            </CardTitle>
            <CardDescription className="mb-1 md:px-4">
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
                                    user && (branch.author.id == user.id || branch.permissions.allowedUsers.includes(user.id)) &&
                                    <SelectItem value={branch.id}>{branch.name}</SelectItem>
                                :
                                <SelectItem value={branch.id}>{branch.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>}
                </div>
            </div>
            <CardContent className="py-4 px-0 md:px-4">
                {branch.description}
                <div className="flex flex-col gap-1 mt-8">
                    <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-0">
                        {user && (branch.author.id == user.id || (branch.permissions.allowCollaborate && branch.project.permissions.allowCollaborate)) &&
                        <CreatePostButton branch={branch} />}

                        {branch.posts && (branch.posts.length > pageCount) &&
                        <div className="lg:absolute right-0 left-0">
                        <PaginationWrapper onPageChange={handlePageChange} page={page}  pageCount={pageCount} data={branch.posts} />
                        </div>}
                    </div>
                {paginatedPosts && paginatedPosts.map(post => 
                    <PostMain post={post} branch={branch} />
                )}
                </div>
            </CardContent>
            <Outlet />
        </Card>}
        </>
    )
}