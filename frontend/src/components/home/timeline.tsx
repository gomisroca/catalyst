// Util Imports
import { Link } from 'react-router-dom';
// Hook Imports
import { useEffect, useState } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
// UI Imports
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Forward, Star } from 'lucide-react';
import { AiOutlineBranches } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiFolderPlus } from 'react-icons/fi';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';
// Component Imports
import BranchCard from '@/components/branch/branch-card';
import PostCard from '@/components/post/post-card';
import ProjectCard from '@/components/project/project-card';

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
  const { data: user, isLoading: userLoading, error: userError } = useGetSelf();
  const { data: follows, isLoading: followsLoading, error: followsError } = useGetFollowedUsers();

  const [timeline, setTimeline] = useState<InteractionOrProjectOrBranchOrPost[]>();

  useEffect(() => {
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

      setTimeline(filteredTimeline);
    }

    if (user && follows) {
      createTimeline(follows);
    }
  }, [user, follows]);

  if (userLoading || followsLoading) {
    return <Loading />;
  }
  if (userError || followsError) {
    return <Error message={userError?.message || followsError?.message} />;
  }
  return (
    <div className="flex w-full flex-col gap-4">
      {timeline?.map((obj) =>
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
                        <BranchCard branch={obj.branch} />
                      </Link>
                    </>
                  ) : obj.postId && obj.post ? (
                    <Link to={`/${obj.post.branch.projectId}/${obj.post.branch.id}/`}>
                      <PostCard post={obj.post} />
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
                    <BranchCard branch={obj.branch} />
                  ) : obj.postId && obj.post ? (
                    <PostCard post={obj.post} />
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
              <PostCard post={obj as Post} />
            </CardContent>
          </Card>
        ) : obj.projectId ? (
          <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
            <CardDescription className="mx-6 flex items-center gap-1">
              <AiOutlineBranches size={'15px'} />
              {obj.author && (obj.author.nickname || obj.author.username)} created a branch
            </CardDescription>
            <CardContent className="p-2">
              <BranchCard branch={obj as Branch} />
            </CardContent>
          </Card>
        ) : obj.name && !obj.projectId ? (
          <Card key={obj.id} className="border-none bg-secondary/20 px-0 pt-2">
            <CardDescription className="mx-6 flex items-center gap-1">
              <FiFolderPlus size={'15px'} />
              {obj.author && (obj.author.nickname || obj.author.username)} created a project
            </CardDescription>
            <CardContent className="p-2">
              <ProjectCard project={obj as Project} />
            </CardContent>
          </Card>
        ) : null
      )}
    </div>
  );
}
