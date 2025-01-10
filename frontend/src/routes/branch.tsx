// Base Imports
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
// Hook Imports
import { useEffect, useState } from 'react';
import { getBranch } from '@/lib/projects';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BsActivity, BsFire } from 'react-icons/bs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { MdKeyboardArrowRight } from 'react-icons/md';
// Component Imports
import CreatePostButton from '@/components/post/create-post-button';
import PostMain from '@/components/post/post-main';
import BranchInteractions from '@/components/branch/branch-interactions';
import PaginationWrapper from '@/components/pagination-wrapper';
import { BranchEditForm } from '@/components/branch/branch-edit-form';

export default function Branch() {
  const [open, setOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setOpen(false);
  };

  const { data: user } = useGetSelf();
  const { projectId, branchId } = useParams();
  const [branch, setBranch] = useState<Branch>();
  const [posts, setPosts] = useState<Post[]>();
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>();
  const [page, setPage] = useState<number>(1);
  const pageCount = 5;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    async function fetchBranch(branchId: string) {
      const fetchedBranch: Branch = await getBranch(branchId);
      setBranch(fetchedBranch);
      console.log(fetchedBranch);
      const sortedPosts = fetchedBranch.posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setPosts(sortedPosts);
    }

    if (projectId && branchId) {
      fetchBranch(branchId);
    }
  }, [projectId, branchId]);

  useEffect(() => {
    function paginate(posts: Post[]) {
      const paginated = posts.slice((page - 1) * pageCount, page * pageCount);
      setPaginatedPosts(paginated);
    }

    if (branch && posts) {
      paginate(posts);
    }
  }, [branch, posts, page]);

  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<string>();
  useEffect(() => {
    if (selectedBranch && selectedBranch !== 'null') {
      navigate(`/${projectId}/${selectedBranch}`);
      setSelectedBranch('null');
    }
  }, [selectedBranch, projectId, navigate]);

  return (
    <>
      {branch && (
        <Card className="relative p-4">
          <CardDescription className="md:px-4">
            {branch.author && (branch.author.nickname || branch.author.username)}
            <Link to={`/profile/${branch.author.id}`} className="hover:text-gray-500">
              @{branch.author.username}
            </Link>
          </CardDescription>
          <CardTitle className="flex items-center gap-2 md:px-4">
            {branch.name}
            {branch.trendingActivity && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BsActivity className="text-green-500" />
                  </TooltipTrigger>
                  <TooltipContent>Active</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {branch.trendingPopularity && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BsFire className="text-orange-500" />
                  </TooltipTrigger>
                  <TooltipContent>Popular</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {user?.id == branch.author.id && (
              <Dialog open={open} onOpenChange={setOpen}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Edit Project</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DialogContent className="w-5/6 rounded-md">
                  <BranchEditForm onSubmitSuccess={handleSubmitSuccess} branch={branch} />
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
          <CardDescription className="mb-1 flex gap-1 md:px-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-default">
                  {`${new Date(branch.createdAt).toLocaleDateString()}`}
                </TooltipTrigger>
                <TooltipContent>Created</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            •
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-default">
                  {`${new Date(branch.updatedAt).toLocaleDateString()}`}
                </TooltipTrigger>
                <TooltipContent>Updated</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
          <div className="top-4 flex flex-col items-start gap-2 md:absolute md:right-4 md:items-end">
            <BranchInteractions branch={branch} />
            <div className="hidden flex-col md:flex">
              {branch.parentBranch && (
                <Link
                  className="flex items-center justify-end gap-1 text-gray-500 hover:text-gray-600"
                  to={`/${projectId}/${branch.parentBranch.id}`}
                >
                  {branch.parentBranch.name}
                  <MdKeyboardArrowRight className="mt-1" />
                </Link>
              )}
              <div className="flex items-center justify-end gap-1">
                {branch.name}
                {branch.childBranches.length > 0 && <MdKeyboardArrowRight className="mt-1" />}
              </div>
              {branch.childBranches && branch.childBranches.length > 0 && (
                <div>
                  <Select onValueChange={(e) => setSelectedBranch(e)} defaultValue={'null'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Child Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'null'}>--</SelectItem>
                      {branch.childBranches.map((branch) =>
                        branch.permissions.private ? (
                          (branch.author.id == user?.id ||
                            (user && branch.permissions.allowedUsers.includes(user.id))) && (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name}
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          <CardContent className="px-0 py-4 md:px-4">
            {branch.description}
            <div className="mt-8 flex flex-col gap-1">
              <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-0">
                {(branch.author.id == user?.id ||
                  (branch.permissions.allowCollaborate && branch.project.permissions.allowCollaborate)) && (
                  <CreatePostButton branch={branch} />
                )}

                {branch.posts && branch.posts.length > pageCount && (
                  <div className="left-0 right-0 lg:absolute">
                    <PaginationWrapper
                      onPageChange={handlePageChange}
                      page={page}
                      pageCount={pageCount}
                      data={branch.posts}
                    />
                  </div>
                )}
              </div>
              {paginatedPosts &&
                paginatedPosts.map((post) => (
                  <div key={post.id}>
                    <PostMain post={post} branch={branch} />
                  </div>
                ))}
            </div>
          </CardContent>
          <Outlet />
        </Card>
      )}
    </>
  );
}
