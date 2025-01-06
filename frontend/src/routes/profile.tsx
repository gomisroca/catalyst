// Libraries Imports
import { useParams } from 'react-router-dom';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineBranches } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoMdHeartDislike, IoMdHeartEmpty } from 'react-icons/io';
// Services Imports
import { useQueryClient } from '@tanstack/react-query';
import { useGetUser } from '@/hooks/users/useGetUser';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useFollowUser } from '@/hooks/interactions/useFollowUser';
// UI Imports
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// Components Imports
import ProfileTimeline from '@/components/user/profile-timeline';
import TimelineBranchCard from '@/components/user/timeline-branch-card';
import TimelineProjectCard from '@/components/user/timeline-project-card';
import TimelinePostCard from '@/components/user/timeline-post-card';

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
            <TimelineProjectCard project={project} />
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
          <div key={branch.id}>
            <TimelineBranchCard branch={branch} />
          </div>
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
  const queryClient = useQueryClient();
  const { data: user } = useGetSelf();
  const { profileId } = useParams();

  if (!profileId) return <div>No profile ID provided.</div>;
  const { data: profile, isLoading, error } = useGetUser(profileId);

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="mb-4 text-red-500">{error.message}</p>
        <Button onClick={() => queryClient.refetchQueries({ queryKey: ['getUser', 'users', profileId] })}>Retry</Button>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No profile data found.</p>
      </div>
    );
  }
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
