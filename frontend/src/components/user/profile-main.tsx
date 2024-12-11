import { useUser } from '@/contexts/user-provider';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { followUser, getUser, unfollowUser } from '@/lib/users';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineBranches } from 'react-icons/ai';
import { FaRegFileAlt } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ProfileTimeline from './profile-timeline';
import { IoMdHeartDislike, IoMdHeartEmpty } from 'react-icons/io';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import TimelineBranchCard from './timeline-branch-card';
import TimelineProjectCard from './timeline-project-card';
import TimelinePostCard from './timeline-post-card';

export default function Profile() {
  const { user } = useUser();

  const { userId } = useParams();
  const [profile, setProfile] = useState<User>();

  async function fetchUser(userId: string) {
    const prof: User = await getUser(userId);
    setProfile(prof);
  }

  async function unfollow(userId: string, profileId: string) {
    const res = await unfollowUser(userId, profileId);
    console.log(res);
    setProfile(res);
  }

  async function follow(userId: string, profileId: string) {
    const res = await followUser(userId, profileId);
    setProfile(res);
  }

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return (
    <>
      {profile && (
        <Card className="w-full p-4">
          <div className="flex items-center gap-2 p-4">
            <Avatar className="rounded-md">
              <AvatarImage
                className="rounded-sm"
                src={`${import.meta.env.VITE_BACKEND_ORIGIN}/images/${profile.avatar}`}
              />
              <AvatarFallback>{profile.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-1 text-lg">
                <div className="flex max-w-[200px] gap-[2px] overflow-hidden text-ellipsis text-nowrap">
                  {profile.nickname ? <span>{profile.nickname}</span> : <span>{profile.username}</span>}
                  <span className="text-gray-500">@{profile.username}</span>
                </div>
                {user?.id == userId ? (
                  <span className="text-sm">This is you!</span>
                ) : user && profile?.followedBy && profile?.followedBy.filter((x) => x == user.id).length > 0 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoMdHeartDislike
                          className="cursor-pointer hover:text-gray-500"
                          onClick={() => unfollow(user.id, profile.id)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Unfollow</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : user ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoMdHeartEmpty
                          className="cursor-pointer hover:text-gray-500"
                          onClick={() => follow(user.id, profile.id)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Follow</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
              </CardTitle>
              <CardDescription className="flex gap-2">
                <Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-1" size="sm">
                            <FiFolderPlus /> {profile.projects.length}
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>See Projects</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
                    {profile.projects.length > 0 ? (
                      profile.projects.map((project) => (
                        <div key={project.id}>
                          <TimelineProjectCard project={project} />
                        </div>
                      ))
                    ) : (
                      <span className="m-auto pb-10">This user hasn't created any projects yet.</span>
                    )}
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-1" size="sm">
                            <AiOutlineBranches /> {profile.branches.length}
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>See Branches</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
                    {profile.branches.length > 0 ? (
                      profile.branches.map((branch) => (
                        <div key={branch.id}>
                          <TimelineBranchCard branch={branch} />
                        </div>
                      ))
                    ) : (
                      <span className="m-auto pb-10">This user hasn't created any branches yet.</span>
                    )}
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-1" size="sm">
                            <FaRegFileAlt /> {profile.posts.length}
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>See Posts</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="max-h-3/4 w-5/6 max-w-none overflow-y-scroll rounded-md px-1 pb-1 pt-10">
                    {profile.posts.length > 0 ? (
                      profile.posts.map((post) => (
                        <div key={post.id}>
                          <TimelinePostCard post={post} />
                        </div>
                      ))
                    ) : (
                      <span className="m-auto pb-10">This user hasn't posted anything yet.</span>
                    )}
                  </DialogContent>
                </Dialog>
              </CardDescription>
            </div>
          </div>
          <CardContent className="p-0 xl:p-4">
            <ProfileTimeline profile={profile} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
