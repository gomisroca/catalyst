import { useUser } from '@/contexts/user-provider';
import { getUserFollows } from '@/lib/users';
import { useEffect, useState } from 'react';
import PaginationWrapper from '../pagination-wrapper';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Forward, Star } from 'lucide-react';
import TimelineBranchCard from '../user/timeline-branch-card';
import TimelinePostCard from '../user/timeline-post-card';
import { Link } from 'react-router-dom';
import { AiOutlineBranches } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiFolderPlus } from 'react-icons/fi';
import TimelineProjectCard from '../user/timeline-project-card';
import { getCookie } from '@/lib/cookies';

interface InteractionOrProjectOrBranchOrPost {
  createdAt?: string;
  updatedAt?: string;
  type?: InteractionType;
  id?: string;
  userId?: string;
  postId?: string;
  branchId?: string;
  content?: string;
  author?: User;
  media?: string[];
  interactions?: Interaction[];
  projectId?: string;
  name?: string;
  description?: string;
  default?: boolean;
  post?: Post;
  branch?: Branch;
  posts?: Post[];
  parentBranch?: Branch;
  childBranches?: Branch[];
  permissions?: Permission;
  avatar?: string;
  branches?: Branch[];
}

export default function HomeTimeline() {
  const { user } = useUser();
  const accessToken = getCookie('__catalyst__jwt');
  const [follows, setFollows] = useState<User[]>([]);
  const [timeline, setTimeline] = useState<InteractionOrProjectOrBranchOrPost[]>();
  const [paginatedTimeline, setPaginatedTimeline] = useState<InteractionOrProjectOrBranchOrPost[]>();
  const [page, setPage] = useState<number>(1);
  const pageCount = 5;

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    function paginate(timeline: InteractionOrProjectOrBranchOrPost[]) {
      const paginated = timeline.slice((page - 1) * pageCount, page * pageCount);
      setPaginatedTimeline(paginated);
    }

    if (timeline) {
      paginate(timeline);
    }
  }, [timeline, page]);

  useEffect(() => {
    async function getFollows(accessToken: string) {
      // Need to pass more data here
      // Interactions, posts, branches, projects, from all followed users
      const userFollows = await getUserFollows(accessToken);
      setFollows(userFollows);
    }
    if (accessToken) {
      getFollows(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    // We have an array of users, I think we want to do the same thing, but iterating over all follows, pushing their stuff into a global unsortedTimeline
    // Then we can sort and filter it and it should be fine?

    function createTimeline(follows: User[]): void {
      let unsortedTimeline: InteractionOrProjectOrBranchOrPost[] = [];
      for (const follow of follows) {
        const followTimeline: InteractionOrProjectOrBranchOrPost[] = [
          ...follow.postInteractions,
          ...follow.branchInteractions,
          ...follow.projects,
          ...follow.branches,
          ...follow.posts,
        ];
        unsortedTimeline = unsortedTimeline.concat(followTimeline);
      }

      const sortedTimeline: InteractionOrProjectOrBranchOrPost[] = unsortedTimeline.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        return dateB!.localeCompare(dateA!);
      });
      const filteredTimeline: InteractionOrProjectOrBranchOrPost[] = sortedTimeline.filter(
        (obj) =>
          obj.type == 'LIKE' ||
          obj.type == 'SHARE' ||
          obj.content ||
          (obj.projectId &&
            (obj.permissions?.private == false ||
              (user && (obj.author?.id == user.id || obj.permissions?.allowedUsers.includes(user.id))))) ||
          (obj.name &&
            !obj.projectId &&
            (obj.permissions?.private == false ||
              (user && (obj.author?.id == user.id || obj.permissions?.allowedUsers.includes(user.id)))))
      );
      console.log(filteredTimeline);

      setTimeline(filteredTimeline);
    }

    if (user && follows) {
      createTimeline(follows);
    }
  }, [user, follows]);

  return (
    <div className="flex w-full flex-col gap-4">
      {timeline && timeline.length > pageCount && (
        <PaginationWrapper onPageChange={handlePageChange} page={page} pageCount={pageCount} data={timeline} />
      )}
      {paginatedTimeline &&
        paginatedTimeline.map((obj) =>
          obj.type == 'LIKE' || obj.type == 'SHARE' ? (
            <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
              {obj.type == 'LIKE' && (
                <>
                  <CardDescription className="mx-6 flex items-center gap-1">
                    <Star size={'15px'} />
                    {obj.author && (obj.author.nickname || obj.author.username)} liked a{' '}
                    {obj.branchId ? 'branch' : 'post'}
                  </CardDescription>
                  <CardContent className="p-2">
                    {obj.branchId && obj.branch ? (
                      <>
                        <Link to={`/${obj.branch.projectId}/${obj.branch.id}/`}>
                          <TimelineBranchCard branch={obj.branch} />
                        </Link>
                      </>
                    ) : obj.postId && obj.post ? (
                      <Link to={`/${obj.post.branch.projectId}/${obj.post.branch.id}/`}>
                        <TimelinePostCard post={obj.post} />
                      </Link>
                    ) : null}
                  </CardContent>
                </>
              )}
              {obj.type == 'SHARE' && (
                <>
                  <CardDescription className="mx-6 flex items-center gap-1">
                    <Forward size={'15px'} />
                    {obj.author && (obj.author.nickname || obj.author.username)} shared a{' '}
                    {obj.branchId ? 'branch' : 'post'}
                  </CardDescription>
                  <CardContent className="p-2">
                    {obj.branchId && obj.branch ? (
                      <TimelineBranchCard branch={obj.branch} />
                    ) : obj.postId && obj.post ? (
                      <TimelinePostCard post={obj.post} />
                    ) : null}
                  </CardContent>
                </>
              )}
            </Card>
          ) : obj.content ? (
            <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
              <CardDescription className="mx-6 flex items-center gap-1">
                <FaRegFileAlt size={'15px'} />
                {obj.author && (obj.author.nickname || obj.author.username)} posted
              </CardDescription>
              <CardContent className="p-2">
                <TimelinePostCard post={obj as Post} />
              </CardContent>
            </Card>
          ) : obj.projectId ? (
            <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
              <CardDescription className="mx-6 flex items-center gap-1">
                <AiOutlineBranches size={'15px'} />
                {obj.author && (obj.author.nickname || obj.author.username)} created a branch
              </CardDescription>
              <CardContent className="p-2">
                <TimelineBranchCard branch={obj as Branch} />
              </CardContent>
            </Card>
          ) : obj.name && !obj.projectId ? (
            <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
              <CardDescription className="mx-6 flex items-center gap-1">
                <FiFolderPlus size={'15px'} />
                {obj.author && (obj.author.nickname || obj.author.username)} created a project
              </CardDescription>
              <CardContent className="p-2">
                <TimelineProjectCard project={obj as Project} />
              </CardContent>
            </Card>
          ) : null
        )}
    </div>
  );
}
