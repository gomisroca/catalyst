// Libraries Imports
import { useParams } from 'react-router-dom';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineBranches } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoMdHeartDislike, IoMdHeartEmpty } from 'react-icons/io';
// Services Imports
import { useGetUser } from '@/hooks/users/useGetUser';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useFollowUser } from '@/hooks/interactions/useFollowUser';
// UI Imports
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Error from '@/components/ui/error';
import Loading from '@/components/ui/loading';
// Components Imports
import ProfileTimeline from '@/components/user/profile-timeline';
import ProjectCard from '@/components/project/project-card';
import BranchCard from '@/components/branch/branch-card';
import TimelinePostCard from '@/components/post/timeline-post-card';

function ProjectDialog({ projects }: { projects: Project[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1" size="sm">
          <FiFolderPlus /> {projects.length}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

function BranchDialog({ branches }: { branches: Branch[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1" size="sm">
          <AiOutlineBranches /> {branches.length}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </DialogContent>
    </Dialog>
  );
}

function PostDialog({ posts }: { posts: Post[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1" size="sm">
          <FaRegFileAlt /> {posts.length}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
        {posts.map((post) => (
          <div key={post.id}>
            <TimelinePostCard post={post} />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

function FollowSection({ user, profile }: { user?: BasicUser; profile: User }) {
  const { mutate: followUser, isPending: followLoading } = useFollowUser();

  const handleFollow = () => {
    followUser({ userId: profile.id });
  };

  if (!user) return null;
  return (
    <>
      {user?.id === profile.id ? (
        <span className="text-sm">This is you!</span>
      ) : profile?.followedBy && profile?.followedBy.includes(user.id) ? (
        <Button asChild onClick={() => handleFollow()} disabled={followLoading}>
          <IoMdHeartDislike className="cursor-pointer hover:text-gray-500" />
        </Button>
      ) : (
        <Button asChild onClick={() => handleFollow()} disabled={followLoading}>
          <IoMdHeartEmpty className="cursor-pointer hover:text-gray-500" />
        </Button>
      )}
    </>
  );
}

export default function Profile() {
  const { data: user } = useGetSelf();
  const { profileId } = useParams();
  if (!profileId) return <Error message="No profile ID provided." />;
  const { data: profile, isLoading, error } = useGetUser(profileId);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!profile) return <Error message="Profile not found." />;
  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-2 p-4">
        <Avatar className="rounded-md">
          <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + profile.avatar}`} />
          <AvatarFallback>{profile.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="flex items-center gap-1 text-lg">
            <div className="flex max-w-[200px] gap-[2px] overflow-hidden text-ellipsis text-nowrap">
              {profile.nickname ? <span>{profile.nickname}</span> : <span>{profile.username}</span>}
              <span className="text-gray-500">@{profile.username}</span>
            </div>
            <FollowSection user={user} profile={profile} />
          </CardTitle>
          <CardDescription className="flex gap-2">
            {profile.projects.length > 0 && <ProjectDialog projects={profile.projects} />}
            {profile.branches.length > 0 && <BranchDialog branches={profile.branches} />}
            {profile.posts.length > 0 && <PostDialog posts={profile.posts} />}
          </CardDescription>
        </div>
      </div>
      <CardContent className="p-0 xl:p-4">
        <ProfileTimeline profile={profile} />
      </CardContent>
    </Card>
  );
}
